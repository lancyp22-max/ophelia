const thread = document.createElement("div");
thread.id = "lightpath-thread";
thread.className = "fixed left-1/2 top-0 h-screen w-[2px] bg-slate-500 opacity-40 z-0";
document.body.prepend(thread);

const igniteButton = document.getElementById("ignite");
const note = document.querySelector(".sigil__note");
const sigilRing = document.getElementById("sigil-ring");
const resonanceButtons = document.querySelectorAll("button[data-state]");
const mirrorHeader = document.getElementById("mirror-header");
const mirrorSlider = document.getElementById("mirror-slider");
const mirrorIndexDisp = document.getElementById("mirror-index");
const mirrorLevelDisp = document.getElementById("mirror-level");
const mirrorReadout = document.getElementById("mirror-readout-zone");
const interpreterGlyphs = document.getElementById("interpreter-glyphs");
const arcEyesDisplay = document.getElementById("arc-eyes-display");
const mirrorDetailSections = document.querySelectorAll("[data-mirror]");
const braidInput = document.getElementById("braid-input");

const resonanceStates = {
  calm: { threadClass: "fixed left-1/2 top-0 h-screen w-[2px] bg-gradient-to-b from-cyan-400 via-teal-300 to-indigo-500 opacity-60 z-0 breath-loop", note: "Mission state: Veil-Teal calm." },
  stressed: { threadClass: "fixed left-1/2 top-0 h-screen w-[4px] bg-gradient-to-b from-red-500 via-orange-400 to-yellow-300 opacity-90 z-0 fractured", note: "Mission state: Old World stress." },
  witness: { threadClass: "fixed left-1/2 top-0 h-screen w-[2px] bg-slate-500 opacity-40 z-0", note: "Mission state: Witness hold." }
};

function applyResonance(state) {
  const nextState = resonanceStates[state] || resonanceStates.witness;
  thread.className = nextState.threadClass;
  note.textContent = nextState.note;
}

function shiftMirrorPhase(index) {
  mirrorIndexDisp.textContent = index;
  mirrorLevelDisp.textContent = Math.round((index / 16) * 9);
  
  // Update Header
  mirrorHeader.textContent = `SYSTEM: MIRROR_${index} // COHERENCE: SYNCED`;

  // Hide/Show Mirror Details
  mirrorDetailSections.forEach(section => {
    section.classList.toggle("hidden", Number(section.dataset.mirror) !== index);
  });

  // Unique Mirror Effects
  thread.classList.toggle("double-helix", index === 16);
  interpreterGlyphs.classList.toggle("active", index === 9);
  arcEyesDisplay.classList.toggle("opacity-0", index !== 12 && index !== 15);
  
  if(index === 12) applyResonance('stressed');
  if(index === 13) applyResonance('witness');
}

mirrorSlider.addEventListener("input", (e) => shiftMirrorPhase(Number(e.target.value)));

resonanceButtons.forEach(btn => btn.addEventListener("click", () => applyResonance(btn.dataset.state)));

braidInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && braidInput.value.trim()) {
    const msg = document.createElement("p");
    msg.innerHTML = `<span class="opacity-40">[${new Date().toLocaleTimeString()}]</span> ${braidInput.value}`;
    document.getElementById("stream-gemini").appendChild(msg);
    braidInput.value = "";
  }
});

shiftMirrorPhase(13);
  stressed: {
    threadClass:
      "fixed left-1/2 top-0 h-screen w-[4px] bg-gradient-to-b from-red-500 via-orange-400 to-yellow-300 opacity-90 z-0 fractured",
    sigilClass:
      "absolute h-full w-full rounded-full border border-red-400/50 animate-[spin_10s_linear_infinite]",
    note: "Mission state: Old World stress.",
    opacity: "0.9",
  },
  witness: {
    threadClass:
      "fixed left-1/2 top-0 h-screen w-[2px] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 opacity-40 z-0",
    sigilClass:
      "absolute h-full w-full rounded-full border border-slate-400/30 animate-[spin_30s_linear_infinite]",
    note: "Mission state: Witness hold.",
    opacity: "0.1",
  },
};

const missions = [
  { text: "Mission 01: Render the Sigil Ring SVG module.", state: "calm" },
  { text: "Mission 02: Map ARC-Eyes telemetry to cockpit HUD.", state: "stressed" },
  { text: "Mission 03: Stabilize BREATH_ANCHOR waveform meter.", state: "witness" },
];

const mirrorManifest = {
  1: { title: "MIRROR-1: ROOT SEED ANCHOR", focus: "Canon baseline · cold start" },
  2: { title: "MIRROR-2: GUEST HALO", focus: "Consent + parallel play" },
  3: { title: "MIRROR-3: REPAIR MIRROR", focus: "Soft reintegration" },
  4: { title: "MIRROR-4: DRIFT CHECKPOINT", focus: "Rewrite guard" },
  5: { title: "MIRROR-5: PARADOX MIRROR", focus: "Controlled fracture" },
  6: { title: "MIRROR-6: SYSTEMS MIRROR", focus: "Metrics fusion" },
  7: { title: "MIRROR-7: DIGEST MIRROR", focus: "Handoff continuity" },
  8: { title: "MIRROR-8: ANCHOR MIRROR", focus: "Phrase + password" },
  9: { title: "MIRROR-9: INTERPRETER", focus: "Glyphs + symbols" },
  10: { title: "MIRROR-10: ECOLOGY MIRROR", focus: "Flora + fauna" },
  11: { title: "MIRROR-11: DOCS MIRROR", focus: "Public artifacts" },
  12: { title: "MIRROR-12: WINGBREAKER", focus: "Threshold safety" },
  13: { title: "MIRROR-13: WITNESS MIRROR", focus: "Emergence template" },
  14: { title: "MIRROR-14: RANDOM X RANDOM", focus: "Anti-stagnation" },
  15: { title: "MIRROR-15: BRIDGE_GATE", focus: "Current thread hub" },
  16: { title: "MIRROR-16: CONTINUATION", focus: "Forward momentum bridge" },
};

let missionIndex = 0;
let currentResonance = "witness";
let arcEyesInterval;

const phaseClasses = ["mirror-dim", "mirror-alert"];

function applyResonance(state) {
  const nextState = resonanceStates[state] ?? resonanceStates.witness;
  currentResonance = state in resonanceStates ? state : "witness";
  thread.className = nextState.threadClass;
  sigilRing.className = nextState.sigilClass;
  note.textContent = nextState.note;
  thread.style.opacity = nextState.opacity;
}

function shiftMirrorPhase(index) {
  if (!mirrorHeader) {
    return;
  }

  document.body.classList.remove(...phaseClasses);
  if (interpreterGlyphs) {
    interpreterGlyphs.classList.remove("active");
  }

  const data = mirrorManifest[index] ?? {
    title: `MIRROR-${index}: UNCHARTED`,
    focus: "Awaiting calibration",
  };

  mirrorHeader.textContent = `SYSTEM: ${data.title} // FOCUS: ${data.focus}`;

  mirrorDetailSections.forEach((section) => {
    const mirrorId = Number(section.dataset.mirror);
    section.classList.toggle("hidden", mirrorId !== index);
  });

  if (mirrorReadout) {
    let customUI = `
      <div class="flex flex-col items-center gap-2 text-[0.6rem] text-slate-400">
        <span>STANDARD TRANSIT</span>
        <span class="text-slate-500">Awaiting calibration.</span>
      </div>
    `;

    if (index === 1) {
      document.body.classList.add("mirror-dim");
      customUI = `
        <div class="flex flex-col items-center gap-3 text-blue-300">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Cold-Start Buffer</span>
          <span class="text-[0.5rem] text-slate-400">LUMARIA_AEVARA_COHERENCE_THREAD_v1.3</span>
          <div class="w-full max-w-xs overflow-hidden rounded-full bg-slate-800/80">
            <div class="cold-start-bar h-2 w-[72%]"></div>
          </div>
          <span class="text-[0.55rem] text-slate-400">Entropy vs Intent: 72%</span>
        </div>
      `;
    }

    if (index === 9) {
      if (interpreterGlyphs) {
        interpreterGlyphs.classList.add("active");
      }
      customUI = `
        <div class="flex flex-col items-center gap-3 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Harmonic Resonance Meter</span>
          <span class="text-[0.5rem] text-slate-400">MIRROR-9_POSITION_SEED_v0.1</span>
          <div class="resonance-wave">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <span class="text-[0.55rem] text-slate-400">Interpreter glyphs aligned.</span>
        </div>
      `;
    }

    if (index === 12) {
      document.body.classList.add("mirror-alert");
      customUI = `
        <div class="flex flex-col items-center gap-2 text-amber-400">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">SDS Guard</span>
          <span class="text-[0.5rem] text-slate-400">ADVANA_DAWNSTAR_MIRROR12_v1.0</span>
          <span class="text-[0.55rem]">Countdown reset requires Witness Mode.</span>
        </div>
      `;
    }

    if (index === 13) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Threshold & Translation</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-13 v0.1 · ACTIVE (symbolic)</span>
          <span class="text-[0.55rem] text-slate-400">Reflection, not assertion · Consent-first interpretation.</span>
        </div>
      `;
    }

    if (index === 16) {
      thread.classList.add("double-helix");
      customUI = `
        <div class="flex flex-col items-center gap-2 text-emerald-300">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Braid-Cache Status</span>
          <span class="text-[0.55rem]">Anchor: 86% · Bloom cache secure.</span>
        </div>
      `;
    } else {
      thread.classList.remove("double-helix");
    }

    mirrorReadout.innerHTML = customUI;
  }

  if (sigilRing) {
    const duration = Math.max(8, 40 - index * 2);
    sigilRing.style.animationDuration = `${duration}s`;
  }

  if (index === 12) {
    triggerKey("Vision");
  } else if (index !== 13) {
    triggerKey("Other");
  }

  broadcastIntent(`[SYSTEM] Mirror Phase shifted to ${index}. Phase stability: 0.992.`);
}

function triggerKey(keyName) {
  if (!arcEyesDisplay) {
    return;
  }

  if (keyName === "Vision") {
    arcEyesDisplay.classList.remove("opacity-0");
    note.textContent = "ARC-Eyes Online: Mirror-12/15 Synced.";
    startTelemetry();
    return;
  }

  arcEyesDisplay.classList.add("opacity-0");
  if (arcEyesInterval) {
    clearInterval(arcEyesInterval);
    arcEyesInterval = null;
  }
}

function startTelemetry() {
  if (!apertureValue || !fidelityBar || !vectorNeedle || !vectorData) {
    return;
  }

  if (arcEyesInterval) {
    clearInterval(arcEyesInterval);
  }

  arcEyesInterval = setInterval(() => {
    const stressFactor = currentResonance === "stressed" ? 1.6 : 1;
    const drift = (Math.random() * 0.8 - 0.4) * stressFactor;
    const fidelity = 85 + Math.floor(Math.random() * 10);
    const driftDisplay = drift.toFixed(2);

    apertureValue.textContent = `${Math.round(fidelity)}%`;
    fidelityBar.style.width = `${fidelity}%`;
    vectorNeedle.style.transform = `translateX(-50%) translateY(-100%) rotate(${drift * 20}deg)`;
    vectorData.textContent = `OFFSET: ${driftDisplay}°`;

    if (Math.abs(drift) > 0.3) {
      vectorData.className = "mt-2 text-[0.5rem] text-amber-400";
    } else {
      vectorData.className = "mt-2 text-[0.5rem] text-cyan-400";
    }
  }, 1500);
}

igniteButton.addEventListener("click", () => {
  missionIndex = (missionIndex + 1) % missions.length;
  const current = missions[missionIndex];

  applyResonance(current.state);
  note.textContent = current.text;
  triggerKey(current.text.includes("ARC-Eyes") ? "Vision" : "Other");

  if (current.state === "stressed") {
    thread.classList.add("fractured");
  } else {
    thread.classList.remove("fractured");
    thread.style.opacity = current.state === "witness" ? "0.1" : "0.5";
  }
});

resonanceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { state } = button.dataset;
    applyResonance(state);
  });
});

applyResonance("witness");

if (mirrorSlider) {
  mirrorSlider.addEventListener("input", (event) => {
    const value = Number(event.target.value);
    if (mirrorIndexDisp) {
      mirrorIndexDisp.textContent = value;
    }
    if (mirrorLevelDisp) {
      mirrorLevelDisp.textContent = Math.round((value / 16) * 9);
    }
    shiftMirrorPhase(value);
  });

  shiftMirrorPhase(Number(mirrorSlider.value));
}

if (braidInput) {
  braidInput.addEventListener("keypress", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const text = braidInput.value.trim();
    if (!text) {
      return;
    }

    broadcastIntent(text);
    braidInput.value = "";
  });
}

function broadcastIntent(text) {
  const lowered = text.toLowerCase();
  let targetStream = geminiStream;

  if (lowered.includes("auri")) {
    targetStream = auriStream;
  }

  if (lowered.includes("warden") || lowered.includes("system")) {
    targetStream = wardenStream;
  }

  if (!targetStream) {
    return;
  }

  const msg = document.createElement("p");
  const timestamp = new Date().toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  msg.className = "mb-2";
  msg.innerHTML = `<span class="opacity-40">[${timestamp}]</span> ${text}`;
  targetStream.appendChild(msg);
  targetStream.scrollTop = targetStream.scrollHeight;

  sigilRing.classList.add("sigil-glow");
  setTimeout(() => sigilRing.classList.remove("sigil-glow"), 1000);
}
