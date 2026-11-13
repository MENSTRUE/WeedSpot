import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type CSSProperties } from 'react';
import { Activity, ArrowRight, CheckCircle2, ChevronDown, CircleAlert, CloudUpload, Download, Eye, Image as ImageIcon, Layers3, Leaf, LoaderCircle, RotateCcw, ScanLine, ShieldCheck, SlidersHorizontal, Sparkles } from 'lucide-react';

type Ready = { model_ready: boolean; model_name: string; device: string; checkpoint_sha256_matches: boolean; detail: string; classes: string[] };
type Prediction = { width: number; height: number; class_percentages: { background: number; crop: number; weed: number }; average_pixel_confidence: number; processing_ms: number; overlay: string; mask: string; palette: Record<string, number[]>; warning: string };
type ViewMode = 'compare' | 'overlay' | 'mask' | 'original';
const MAX_MB = 10;

function downloadDataUrl(dataUrl: string, name: string) {
  const anchor = document.createElement('a'); anchor.href = dataUrl; anchor.download = name; document.body.appendChild(anchor); anchor.click(); anchor.remove();
}

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [ready, setReady] = useState<Ready | null>(null);
  const [statusError, setStatusError] = useState('');
  const [selected, setSelected] = useState<File | null>(null);
  const [original, setOriginal] = useState('');
  const [result, setResult] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<ViewMode>('compare');
  const [reveal, setReveal] = useState(50);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/api/v1/ready').then(async response => { if (!response.ok) throw new Error(`API status ${response.status}`); return response.json() as Promise<Ready>; })
      .then(data => { if (active) setReady(data); })
      .catch(() => { if (active) setStatusError('API unreachable. Start FastAPI on port 8000.'); });
    return () => { active = false; };
  }, []);
  useEffect(() => { if (!selected) { setOriginal(''); return; } const url = URL.createObjectURL(selected); setOriginal(url); return () => URL.revokeObjectURL(url); }, [selected]);

  function pick(file?: File) {
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setError('Choose a JPG, PNG, or WebP image.'); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setError('Image must be 10 MB or smaller.'); return; }
    setSelected(file); setResult(null); setMode('compare'); setError(''); setReveal(50);
  }
  function onInput(e: ChangeEvent<HTMLInputElement>) { pick(e.target.files?.[0]); e.target.value = ''; }
  function onDrop(e: DragEvent<HTMLDivElement>) { e.preventDefault(); setDragging(false); pick(e.dataTransfer.files[0]); }
  async function analyze() {
    if (!selected || !ready?.model_ready) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const data = new FormData(); data.append('file', selected);
      const response = await fetch('/api/v1/predict', { method: 'POST', body: data });
      const parsed = await response.json();
      if (!response.ok) throw new Error(typeof parsed.detail === 'string' ? parsed.detail : 'Prediction failed.');
      setResult(parsed as Prediction);
    } catch (e) { setError(e instanceof Error ? e.message : 'Something went wrong.'); }
    finally { setLoading(false); }
  }
  function reset() { setSelected(null); setResult(null); setError(''); setMode('compare'); }
  const processed = result ? (mode === 'mask' ? result.mask : result.overlay) : '';
  const bg = result?.class_percentages.background ?? 0;
  const crop = result?.class_percentages.crop ?? 0;
  const weed = result?.class_percentages.weed ?? 0;
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-icon"><ScanLine size={23}/></div><div><strong>WeedSpot</strong><small>FIELD INTELLIGENCE</small></div></div>
        <div className="side-label">WORKSPACE</div>
        <button className="nav active"><Layers3 size={18}/> Segmentation <span className="nav-dot"/></button>
        <button className="nav" onClick={() => document.getElementById('model-info')?.scrollIntoView({behavior:'smooth'})}><Activity size={18}/> Model details</button>
        <div className="sidebar-bottom"><div className="sidebar-info"><ShieldCheck size={17}/><span>Research-grade prototype</span></div><div className="sidebar-version">DAY 35 / 100 <span>•</span> V3.0</div></div>
      </aside>
      <main className="main">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>Segmentation Studio</strong></div><div className="top-actions"><div className={'api-badge ' + (ready?.model_ready ? 'online' : 'offline')}><span className="pulse"/>{ready?.model_ready ? 'Model online' : 'Model unavailable'}</div><span className="avatar">WS</span></div></header>
        <div className="content">
          <div className="eyebrow"><Sparkles size={14}/> PRECISION AGRICULTURE AI <span className="eyebrow-line"/></div>
          <div className="heading-row"><div><h1>See the field <em>clearly.</em></h1><p className="subtitle">Understand crop coverage and weed presence with pixel-level AI segmentation.</p></div><div className="model-chip"><div className="chip-icon"><Leaf size={19}/></div><div><small>ACTIVE MODEL</small><strong>Compact U-Net V3</strong></div></div></div>
          {statusError && <div className="notice alert"><CircleAlert size={18}/>{statusError}</div>}
          {ready && !ready.model_ready && <div className="notice alert"><CircleAlert size={18}/><span>Model not ready: {ready.detail}</span></div>}
          <section className="studio"><div className="section-head"><div className="section-title"><div className="num">01</div><div><h2>Image analysis</h2><p>Upload a field image to begin processing</p></div></div>{selected && <button className="text-button" onClick={reset}><RotateCcw size={15}/> Reset image</button>}</div>
            {!selected ? <div className={'dropzone ' + (dragging ? 'is-dragging' : '')} onDragOver={e=>{e.preventDefault();setDragging(true);}} onDragLeave={()=>setDragging(false)} onDrop={onDrop} onClick={()=>inputRef.current?.click()} onKeyDown={e=>{if(e.key==='Enter' || e.key===' '){e.preventDefault();inputRef.current?.click();}}} role="button" tabIndex={0}><div className="upload-icon"><CloudUpload size={32}/></div><h3>Drop your field image here</h3><p>Or browse your files to upload a photo for segmentation</p><span className="upload-cta">Choose image <ArrowRight size={17}/></span><small>JPG, PNG or WebP · Max 10 MB · No data is stored by this application</small></div>
            : <><div className="preview-toolbar"><div className="file-name"><ImageIcon size={16}/><span>{selected.name}</span><small>{(selected.size/1024/1024).toFixed(2)} MB</small></div><div className="view-tabs">{(['compare','overlay','mask','original'] as ViewMode[]).map(t=><button key={t} className={mode===t?'selected':''} onClick={()=>setMode(t)} disabled={!result && t!=='original' && t!=='compare'}>{t}</button>)}</div></div>
                <div className="image-preview" style={{'--reveal':`${reveal}%` } as CSSProperties}>
                  {original && <img className="image-base" src={original} alt="Uploaded field"/>}
                  {result && mode==='compare' && <><div className="compare-cover"><img src={result.overlay} alt="Segmentation overlay"/></div><div className="compare-divider"><div className="compare-handle"><Eye size={15}/></div></div><input className="compare-range" type="range" aria-label="Compare original and segmentation" min="0" max="100" value={reveal} onChange={e=>setReveal(Number(e.target.value))}/></>}
                  {result && (mode==='overlay'||mode==='mask') && <img className="image-result" src={processed} alt="Segmentation result"/>}
                  {!result && <div className="preview-hint">Original image · {selected.name}</div>}
                  {result && <div className="image-watermark"><ScanLine size={14}/> WEEDSPOT AI</div>}
                </div>
                <div className="preview-actions"><span><CheckCircle2 size={16}/> Image ready for {result ? 'review' : 'analysis'}</span><button className="primary-btn" onClick={analyze} disabled={loading || !ready?.model_ready}>{loading ? <><LoaderCircle className="spin" size={18}/> Analyzing...</> : <><ScanLine size={18}/>{result?'Run analysis again':'Analyze image'}<ArrowRight size={16}/></>}</button></div>
              </>}
            <input ref={inputRef} type="file" hidden accept="image/png,image/jpeg,image/webp" onChange={onInput}/>
            {error && <div className="notice alert"><CircleAlert size={18}/>{error}</div>}
          </section>
          <section className="lower-grid"><div className="panel results-panel"><div className="panel-head"><div><h2>Coverage breakdown</h2><p>Predicted percentage of image pixels</p></div><span className="tiny-tag">{result?'ANALYSIS COMPLETE':'AWAITING IMAGE'}</span></div>
            {result ? <><div className="bar" role="img" aria-label={`Background ${bg}%, Crop ${crop}%, Weed ${weed}%`}><div className="segment bg" style={{width:`${bg}%`}}/><div className="segment crop" style={{width:`${crop}%`}}/><div className="segment weed" style={{width:`${weed}%`}}/></div><div className="legend">{[['background',bg],['crop',crop],['weed',weed]].map(([name,value])=><div key={name}><span className={`swatch ${name}`}/><span className="legend-name">{name}</span><strong>{value}%</strong></div>)}</div><div className="panel-divider"/><div className="stats-grid"><div><span>Processing time</span><strong>{result.processing_ms} ms</strong></div><div><span>Avg. pixel confidence</span><strong>{(result.average_pixel_confidence*100).toFixed(1)}%</strong></div><div><span>Resolution</span><strong>{result.width} × {result.height}</strong></div></div><div className="result-actions"><button className="secondary-btn" onClick={()=>downloadDataUrl(result.overlay, 'weedspot-overlay.png')}><Download size={16}/> Download overlay</button><button className="secondary-btn" onClick={()=>downloadDataUrl(result.mask, 'weedspot-mask.png')}><Download size={16}/> Download mask</button></div></> : <div className="empty-analytics"><div className="empty-icon"><SlidersHorizontal size={25}/></div><h3>Your field insights will appear here</h3><p>Analyze an image to reveal crop, weed, and background predictions.</p></div>}
          </div><div className="panel insights-panel"><div className="panel-head"><div><h2>How it works</h2><p>From raw imagery to actionable insights</p></div></div><div className="steps"><div><span className="step-icon"><CloudUpload size={19}/></span><div><strong>Upload imagery</strong><p>Select an agricultural photograph.</p></div></div><div><span className="step-icon"><ScanLine size={19}/></span><div><strong>Pixel-wise segmentation</strong><p>Compact U-Net classifies background, crop, and weed pixels.</p></div></div><div><span className="step-icon"><Layers3 size={19}/></span><div><strong>Explore prediction</strong><p>Compare layers and export a visualization.</p></div></div></div></div></section>
          <section className="model-details" id="model-info"><button className="model-details-toggle" onClick={()=>setShowDetails(!showDetails)}><span><Activity size={17}/> Model & research information</span><ChevronDown size={18} className={showDetails?'turned':''}/></button>{showDetails && <div className="model-details-body"><p><strong>Architecture:</strong> Custom compact U-Net (n=24), trained on CWFID and EWIS1 sources at 384×384. Predictions are research screening outputs and must not be used for autonomous spraying.</p><p><strong>Deployment:</strong> {ready?.model_ready?'Checkpoint integrity validated.':ready?.detail || 'Backend connection pending.'} {ready?.device ? `Inference device: ${ready.device}.` : ''}</p><p><strong>Limitations:</strong> Geographic generalization, image-domain shift, small weeds, and source license restrictions. Pixel percentages are not physical area estimates.</p></div>}</section>
          <footer>© 2026 WeedSpot · Day 35 of 100 Days of Projects <span>Built for research & exploration</span></footer>
        </div>
      </main>
    </div>
  );
}
