import { useState } from "react";

const NAVY = "#1a3a5c";
const ORANGE = "#e85d1a";
const ORANGE_LT = "#f5a623";

const TEAM = [
  { id:1, name:"Bob",  role:"COO",          dept:"Operations",   mission:"Meeting summaries & decision memos",      initials:"BO", color:"#E8622A" },
  { id:2, name:"Jane", role:"CFO",          dept:"Finance",      mission:"Financial reports & data analysis",       initials:"JA", color:"#0E7490" },
  { id:3, name:"Leo",  role:"CTO / ENV",    dept:"Technology",   mission:"n8n automation & Claude API workflows",   initials:"LE", color:"#7C3AED" },
  { id:4, name:"Joy",  role:"CDO",          dept:"Biz Dev",      mission:"Proposal drafting & market research",     initials:"JY", color:"#059669" },
  { id:5, name:"Lisa", role:"CMO",          dept:"Marketing",    mission:"Marketing copy & tenant communications",  initials:"LI", color:"#DC2626" },
  { id:6, name:"Ken",  role:"ENV Director", dept:"Environment",  mission:"Compliance reports & gov. submissions",   initials:"KE", color:"#9333EA" },
  { id:7, name:"Tony", role:"Tech Lead",    dept:"IT",           mission:"System docs & infrastructure SOPs",       initials:"TY", color:"#0284C7" },
  { id:8, name:"Joe",  role:"Operations",   dept:"Operations",   mission:"Tenant issue tracking & ops reports",     initials:"JO", color:"#B45309" },
  { id:9, name:"Rose", role:"HR / Admin",   dept:"Admin",        mission:"HR processes & staff communications",     initials:"RO", color:"#BE185D" },
];

const WEEKS = [
  { wk:1, label:"Wk 1: IGNITE",   emoji:"🔥", theme:"Create Desire",
    milestones:["Attend AI Kickoff session","Pick your personal AI mission","Try Claude at least once","Share progress on Telegram"],
    tasks:["Attend AI Kickoff session","Pick your AI mission","Try Claude for 1 task","Share update on Telegram"] },
  { wk:2, label:"Wk 2: INSTALL",  emoji:"⚡", theme:"Build the Habit",
    milestones:["Complete your first AI-assisted task","Set up Claude on all devices","Submit first workflow idea","Teach 1 thing to a colleague"],
    tasks:["Complete 1 AI-assisted task","Set up Claude on phone & desktop","Submit workflow form","Teach a colleague one AI trick"] },
  { wk:3, label:"Wk 3: COMPETE",  emoji:"🏆", theme:"Show Results",
    milestones:["Build or improve one workflow","Present result to team","Save 2+ hours using AI","Log a real business win"],
    tasks:["Build or improve one workflow","Present result at standup","Save 2+ hours with AI","Log a measurable business win"] },
  { wk:4, label:"Wk 4: LOCK IN",  emoji:"🔒", theme:"Make it Permanent",
    milestones:["Document your AI workflow as SOP","Onboard one colleague","Achieve your target % gain","Complete final assessment"],
    tasks:["Document workflow as SOP","Onboard one colleague","Achieve target gain","Complete final assessment"] },
];

const getBadge = (score) => {
  if (score === 0) return { label:"Seedling", emoji:"🌱", bg:"#ecfdf5", color:"#065f46" };
  if (score <= 4)  return { label:"Sprouting", emoji:"🌿", bg:"#f0fdf4", color:"#166534" };
  if (score <= 8)  return { label:"Growing",   emoji:"⚡", bg:"#eff6ff", color:"#1e40af" };
  if (score <= 12) return { label:"Advancing", emoji:"🚀", bg:"#fef3c7", color:"#92400e" };
  return                  { label:"Champion",  emoji:"🏆", bg:"#fff7ed", color:"#9a3412" };
};

export default function App() {
  const [activeWk, setActiveWk] = useState(1);
  const [view, setView] = useState("leaderboard");
  const [checks, setChecks] = useState({});
  const [selected, setSelected] = useState(null);

  const getScore = (id) => {
    let s = 0;
    WEEKS.forEach(w => w.tasks.forEach((_, ti) => { if (checks[`${id}-${w.wk}-${ti}`]) s++; }));
    return s;
  };

  const toggle = (id, wk, ti) => {
    const k = `${id}-${wk}-${ti}`;
    setChecks(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const totalChecks = Object.values(checks).filter(Boolean).length;
  const totalPossible = TEAM.length * 16;
  const teamPct = Math.round((totalChecks / totalPossible) * 100);
  const champions = TEAM.filter(m => getScore(m.id) >= 13).length;

  const ranked = [...TEAM].map(m => ({ ...m, score: getScore(m.id) })).sort((a,b) => b.score - a.score);
  const wk = WEEKS.find(w => w.wk === activeWk);

  const s = {
    wrap:   { fontFamily:"'Segoe UI',Arial,sans-serif", background:"#f2f5f9", minHeight:"100vh", color:"#1a2332" },
    hdr:    { background:NAVY, padding:"0 0 0 0", position:"relative", overflow:"hidden" },
    hdrDeco:{ position:"absolute", top:-60, right:-80, width:280, height:280, background:"rgba(255,255,255,.03)", borderRadius:"50%", pointerEvents:"none" },
    hdrInner:{ maxWidth:900, margin:"0 auto", padding:"22px 24px 18px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, position:"relative" },
    brand:  { fontSize:10, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,.5)", marginBottom:4 },
    hdrTtl: { fontSize:26, fontWeight:800, color:"#fff", lineHeight:1.1, margin:0 },
    hdrSub: { fontSize:12.5, color:"rgba(255,255,255,.6)", marginTop:3, fontStyle:"italic" },
    bar:    { height:4, background:ORANGE, position:"relative" },
    barGlow:{ position:"absolute", left:0, top:0, width:80, height:4, background:ORANGE_LT },
    hdrRight:{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8, flexShrink:0 },
    progBox:{ textAlign:"right" },
    progLbl:{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,.45)", marginBottom:2 },
    progPct:{ fontSize:32, fontWeight:800, color:ORANGE_LT, lineHeight:1 },
    progSub:{ fontSize:11, color:"rgba(255,255,255,.4)" },
    // NEW BUTTON
    wfBtn:  { background:ORANGE, color:"#fff", border:"none", borderRadius:8, padding:"9px 16px", fontSize:12.5, fontWeight:700, cursor:"pointer", letterSpacing:"0.03em", whiteSpace:"nowrap", transition:"all .2s", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 },
    main:   { maxWidth:900, margin:"0 auto", padding:"16px 24px 40px" },
    cards:  { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 },
    card:   { background:"#fff", borderRadius:10, border:"1px solid #e2e8f0", padding:"14px 16px" },
    cardLbl:{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", marginBottom:4 },
    cardVal:{ fontSize:28, fontWeight:800, color:NAVY, lineHeight:1 },
    cardSub:{ fontSize:11, color:"#94a3b8", marginTop:2 },
    wkTabs: { display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" },
    wkTab:  (on) => ({ padding:"9px 18px", borderRadius:20, border:`1.5px solid ${on?ORANGE:"#e2e8f0"}`, background:on?ORANGE:"#fff", color:on?"#fff":"#64748b", fontSize:13, fontWeight:700, cursor:"pointer", transition:"all .2s" }),
    wkBand: { background:"#fff", borderRadius:10, border:"1px solid #e2e8f0", padding:"12px 18px", marginBottom:14, display:"flex", alignItems:"center", gap:14 },
    wkEmoji:{ fontSize:22 },
    wkName: { fontSize:15, fontWeight:800, color:NAVY },
    wkTheme:{ fontSize:12, color:"#94a3b8", marginTop:1 },
    miles:  { display:"flex", gap:7, flexWrap:"wrap", marginLeft:"auto" },
    mileTag:{ fontSize:11, fontWeight:600, padding:"4px 11px", borderRadius:20, background:"#f1f5f9", color:"#475569", border:"1px solid #e2e8f0" },
    viewRow:{ display:"flex", gap:8, marginBottom:14 },
    viewBtn:(on) => ({ padding:"8px 18px", borderRadius:8, border:`1.5px solid ${on?NAVY:"#e2e8f0"}`, background:on?NAVY:"#fff", color:on?"#fff":"#64748b", fontSize:13, fontWeight:700, cursor:"pointer" }),
    // Leaderboard
    lbRow:  (i) => ({ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"#fff", borderRadius:9, border:"1px solid #e2e8f0", marginBottom:7, transition:"box-shadow .2s" }),
    rank:   { fontSize:13, fontWeight:800, color:"#94a3b8", width:20, textAlign:"center", flexShrink:0 },
    av:     (color) => ({ width:38, height:38, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:800, flexShrink:0 }),
    mName:  { fontSize:14, fontWeight:700, color:NAVY },
    mRole:  { fontSize:11, color:"#94a3b8" },
    badge:  (bg,col) => ({ fontSize:11, fontWeight:700, padding:"2px 9px", borderRadius:20, background:bg, color:col }),
    barWrap:{ flex:1, height:6, background:"#f1f5f9", borderRadius:3, overflow:"hidden" },
    barFill:(score,color) => ({ height:"100%", borderRadius:3, background:color, width:`${(score/16)*100}%`, transition:"width .4s" }),
    scoreLbl:{ fontSize:13, fontWeight:800, color:NAVY, width:38, textAlign:"right", flexShrink:0 },
    // Team grid
    grid:   { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 },
    gridCard:{ background:"#fff", borderRadius:10, border:"1px solid #e2e8f0", padding:"16px", overflow:"hidden" },
    gcTop:  { display:"flex", alignItems:"center", gap:10, marginBottom:10 },
    gcMission:{ fontSize:11.5, color:"#64748b", fontStyle:"italic", marginBottom:10, lineHeight:1.4 },
    wkBar:  { marginBottom:6 },
    wkBarLbl:{ display:"flex", justifyContent:"space-between", fontSize:10.5, color:"#94a3b8", fontWeight:600, marginBottom:3 },
    wkBarBg:{ height:4, background:"#f1f5f9", borderRadius:2, overflow:"hidden" },
    wkBarFl:(pct,color) => ({ height:"100%", width:`${pct}%`, background:color, borderRadius:2, transition:"width .4s" }),
    // Task tracker
    ttCard: { background:"#fff", borderRadius:10, border:"1px solid #e2e8f0", padding:"16px 18px", marginBottom:9 },
    ttHdr:  { display:"flex", alignItems:"center", gap:10, marginBottom:10, cursor:"pointer" },
    ttAvRow:{ display:"flex", alignItems:"center", gap:10, flex:1 },
    ttTasks:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 },
    ttTask: (done) => ({ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:7, background:done?"#f0fdf4":"#f8fafc", border:`1px solid ${done?"#bbf7d0":"#e2e8f0"}`, cursor:"pointer", transition:"all .2s" }),
    ttChk:  (done) => ({ width:16, height:16, borderRadius:4, border:`2px solid ${done?"#16a34a":"#cbd5e1"}`, background:done?"#16a34a":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .2s" }),
    ttTxt:  (done) => ({ fontSize:12.5, fontWeight:500, color:done?"#166534":"#475569", textDecoration:done?"line-through":"none" }),
  };

  return (
    <div style={s.wrap}>
      <div style={s.hdr}>
        <div style={s.hdrDeco}/>
        <div style={s.hdrInner}>
          <div>
            <div style={s.brand}>Vietson Infrastructure Development SHC</div>
            <div style={s.hdrTtl}>VSG AI Sprint — 30-Day Tracker</div>
            <div style={s.hdrSub}>CEO Dashboard · Thai Hoa Industrial Park</div>
          </div>
          <div style={s.hdrRight}>
            <div style={s.progBox}>
              <div style={s.progLbl}>Team Progress</div>
              <div style={s.progPct}>{teamPct}%</div>
              <div style={s.progSub}>{totalChecks} / {totalPossible} tasks</div>
            </div>
            <a href="https://vsg-crm-form.netlify.app/" target="_blank" rel="noopener noreferrer" style={s.wfBtn}
               onMouseEnter={e=>e.currentTarget.style.background="#c94e15"}
               onMouseLeave={e=>e.currentTarget.style.background=ORANGE}>
              <span style={{fontSize:14}}>📋</span> Submit Workflow Request
            </a>
          </div>
        </div>
        <div style={s.bar}><div style={s.barGlow}/></div>
      </div>

      <div style={s.main}>
        {/* Stats */}
        <div style={s.cards}>
          {[
            { lbl:"Team Members", val:9,         sub:"active" },
            { lbl:"Sprint Length", val:"30",       sub:"days" },
            { lbl:"Target Gain",  val:"30%",       sub:"per person" },
            { lbl:"Champions 🏆", val:champions,   sub:"so far" },
          ].map((c,i) => (
            <div key={i} style={s.card}>
              <div style={s.cardLbl}>{c.lbl}</div>
              <div style={s.cardVal}>{c.val}</div>
              <div style={s.cardSub}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Week tabs */}
        <div style={s.wkTabs}>
          {WEEKS.map(w => (
            <button key={w.wk} style={s.wkTab(activeWk===w.wk)} onClick={()=>setActiveWk(w.wk)}>
              {w.emoji} {w.label}
            </button>
          ))}
        </div>

        {/* Week band */}
        <div style={s.wkBand}>
          <span style={s.wkEmoji}>{wk.emoji}</span>
          <div>
            <div style={s.wkName}>WEEK {wk.wk} — {wk.label.split(": ")[1]}</div>
            <div style={s.wkTheme}>{wk.theme}</div>
          </div>
          <div style={s.miles}>
            {wk.milestones.map((m,i) => (
              <span key={i} style={s.mileTag}>{m}</span>
            ))}
          </div>
        </div>

        {/* View toggle */}
        <div style={s.viewRow}>
          {[["leaderboard","🏆 Leaderboard"],["teamgrid","👥 Team Grid"],["tasks","✅ Task Tracker"]].map(([v,lbl]) => (
            <button key={v} style={s.viewBtn(view===v)} onClick={()=>setView(v)}>{lbl}</button>
          ))}
        </div>

        {/* LEADERBOARD */}
        {view==="leaderboard" && (
          <div>
            {ranked.map((m,i) => {
              const bdg = getBadge(m.score);
              return (
                <div key={m.id} style={s.lbRow(i)}>
                  <div style={s.rank}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</div>
                  <div style={s.av(m.color)}>{m.initials}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                      <span style={s.mName}>{m.name}</span>
                      <span style={{fontSize:11,background:"#f1f5f9",color:"#64748b",padding:"2px 8px",borderRadius:20,fontWeight:600}}>{m.role}</span>
                      <span style={s.badge(bdg.bg,bdg.color)}>{bdg.emoji} {bdg.label}</span>
                    </div>
                    <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{m.mission}</div>
                    <div style={{marginTop:8}}>
                      {WEEKS.map(w => {
                        const wScore = w.tasks.filter((_,ti) => checks[`${m.id}-${w.wk}-${ti}`]).length;
                        return (
                          <div key={w.wk} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                            <span style={{fontSize:10,color:"#94a3b8",width:55}}>{w.label.split(":")[0]}</span>
                            <div style={s.barWrap}><div style={s.barFill(wScore/4*16,m.color)}/></div>
                            <span style={{fontSize:10,color:"#94a3b8",width:24,textAlign:"right"}}>{wScore}/4</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={s.scoreLbl}>{m.score}<span style={{fontSize:10,color:"#94a3b8"}}>/16</span></div>
                </div>
              );
            })}
          </div>
        )}

        {/* TEAM GRID */}
        {view==="teamgrid" && (
          <div style={s.grid}>
            {TEAM.map(m => {
              const score = getScore(m.id);
              const bdg = getBadge(score);
              return (
                <div key={m.id} style={s.gridCard}>
                  <div style={s.gcTop}>
                    <div style={s.av(m.color)}>{m.initials}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <span style={{fontWeight:800,fontSize:14,color:NAVY}}>{m.name}</span>
                        <span style={{fontSize:10,background:"#f1f5f9",color:"#64748b",padding:"2px 7px",borderRadius:20,fontWeight:600}}>{m.role}</span>
                      </div>
                      <span style={s.badge(bdg.bg,bdg.color)}>{bdg.emoji} {bdg.label}</span>
                    </div>
                    <div style={{fontSize:18,fontWeight:800,color:m.color}}>{score}<span style={{fontSize:11,color:"#94a3b8"}}>/16</span></div>
                  </div>
                  <div style={s.gcMission}>📌 {m.mission}</div>
                  {WEEKS.map(w => {
                    const ws = w.tasks.filter((_,ti) => checks[`${m.id}-${w.wk}-${ti}`]).length;
                    return (
                      <div key={w.wk} style={s.wkBar}>
                        <div style={s.wkBarLbl}><span>{w.label}</span><span>{ws}/4</span></div>
                        <div style={s.wkBarBg}><div style={s.wkBarFl((ws/4)*100,m.color)}/></div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* TASK TRACKER */}
        {view==="tasks" && (
          <div>
            {TEAM.map(m => {
              const isOpen = selected===m.id;
              const score = getScore(m.id);
              const wkScore = wk.tasks.filter((_,ti) => checks[`${m.id}-${activeWk}-${ti}`]).length;
              return (
                <div key={m.id} style={s.ttCard}>
                  <div style={s.ttHdr} onClick={()=>setSelected(isOpen?null:m.id)}>
                    <div style={s.ttAvRow}>
                      <div style={s.av(m.color)}>{m.initials}</div>
                      <div>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{fontWeight:800,fontSize:14,color:NAVY}}>{m.name}</span>
                          <span style={{fontSize:11,background:"#f1f5f9",color:"#64748b",padding:"2px 8px",borderRadius:20,fontWeight:600}}>{m.role}</span>
                        </div>
                        <div style={{fontSize:11,color:"#94a3b8",marginTop:1}}>{m.mission}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>This week</div>
                        <div style={{fontSize:16,fontWeight:800,color:m.color}}>{wkScore}/4</div>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <div style={{fontSize:10,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>Total</div>
                        <div style={{fontSize:16,fontWeight:800,color:NAVY}}>{score}/16</div>
                      </div>
                      <span style={{color:"#94a3b8",fontSize:16,transform:isOpen?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>▾</span>
                    </div>
                  </div>
                  {isOpen && (
                    <div style={s.ttTasks}>
                      {wk.tasks.map((task,ti) => {
                        const done = !!checks[`${m.id}-${activeWk}-${ti}`];
                        return (
                          <div key={ti} style={s.ttTask(done)} onClick={()=>toggle(m.id,activeWk,ti)}>
                            <div style={s.ttChk(done)}>
                              {done && <span style={{color:"#fff",fontSize:10,fontWeight:700}}>✓</span>}
                            </div>
                            <span style={s.ttTxt(done)}>{task}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
