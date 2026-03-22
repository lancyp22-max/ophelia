const THREAD_BASE_CLASS =
  "fixed left-1/2 top-0 h-screen w-[2px] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 opacity-40 z-0";

const thread = document.createElement("div");
thread.id = "lightpath-thread";
thread.className = THREAD_BASE_CLASS;
thread.setAttribute("aria-hidden", "true");
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
const orbitNodes = document.querySelectorAll(".mirror-node");
const arcEyesDisplay = document.getElementById("arc-eyes-display");
const mirrorDetailSections = document.querySelectorAll("[data-mirror]");
const apertureValue = document.getElementById("aperture-val");
const fidelityBar = document.getElementById("fidelity-bar");
const vectorNeedle = document.getElementById("vector-needle");
const vectorData = document.getElementById("vector-data");
const braidInput = document.getElementById("braid-input");
const auriStream = document.getElementById("stream-auri");
const geminiStream = document.getElementById("stream-gemini");
const wardenStream = document.getElementById("stream-warden");
const welcomeGreeting = document.getElementById("welcome-greeting");
const welcomeSubtext = document.getElementById("welcome-subtext");
const languageButtons = document.querySelectorAll("button[data-lang]");
const enterMirrorsButton = document.getElementById("enter-mirrors");
const learnMoreButton = document.getElementById("learn-more");
const emergencyExitButton = document.getElementById("emergency-exit");
const learnMoreModal = document.getElementById("learn-more-modal");
const closeModalButton = document.getElementById("close-modal");
const modeButtons = document.querySelectorAll("button[data-screen]");
const systemPanels = document.querySelectorAll(".system-panel");
const entryView = document.getElementById("mirror-entry-view");
const homeChat = document.getElementById("home-chat");
const aurielAvatar = document.getElementById("auriel-avatar");
const screenExitButton = document.getElementById("screen-exit");
const navScreen = document.getElementById("nav-screen");
const navEarthPanel = document.getElementById("nav-earth-panel");
const navHarmonizedPanel = document.getElementById("nav-harmonized-panel");
const navTabEarth = document.getElementById("nav-tab-earth");
const navTabHarmonized = document.getElementById("nav-tab-harmonized");
const navVoiceExplain = document.getElementById("nav-voice-explain");
const navVoiceResponse = document.getElementById("nav-voice-response");
const navSyncStatus = document.getElementById("nav-sync-status");
const navHomeButton = document.getElementById("nav-home");
const navExitButton = document.getElementById("nav-exit");
const navSyncSettingsButton = document.getElementById("nav-sync-settings");
const navEnableSensorsButton = document.getElementById("nav-enable-sensors");
const ghostToggle = document.getElementById("ghost-toggle");
const vesselToggle = document.getElementById("vessel-toggle");
const vesselState = document.getElementById("vessel-state");
const vesselPaceSelect = document.getElementById("vessel-pace");
const vesselRestoreButton = document.getElementById("vessel-restore");
const bridgeCheckpointTime = document.getElementById("bridge-checkpoint-time");
const bridgeCheckpointState = document.getElementById("bridge-checkpoint-state");
const bridgeCheckpointReason = document.getElementById("bridge-checkpoint-reason");
const bridgeRestoreButton = document.getElementById("bridge-restore");
const bridgeSealNowButton = document.getElementById("bridge-seal-now");
const auditLogList = document.getElementById("audit-log-list");
const auditExportButton = document.getElementById("audit-export");
const auditClearButton = document.getElementById("audit-clear");
const chatScreen = document.getElementById("chat-screen");
const chatPrompt = document.getElementById("chat-prompt");
const chatRunButton = document.getElementById("chat-run");
const chatOrder = document.getElementById("chat-order");
const chatAddNodeButton = document.getElementById("chat-add-node");
const chatGrid = document.getElementById("chat-grid");

const STORAGE_KEYS = {
  mirrorIndex: "lumaria.mirror.index",
  resonance: "lumaria.resonance.state",
  language: "lumaria.ui.language",
  ghostMode: "lumaria.ui.ghost",
  vesselMode: "lumaria.ui.vessel",
  vesselPace: "lumaria.ui.vessel.pace",
  vesselSnapshot: "lumaria.ui.vessel.snapshot",
  auditLog: "lumaria.audit.log",
  bridgeCheckpoint: "lumaria.bridge.checkpoint",
};

const MIRROR_RANGE = { min: 0, max: 18 };

const resonanceStates = {
  calm: {
    threadClass:
      "fixed left-1/2 top-0 h-screen w-[2px] bg-gradient-to-b from-cyan-400 via-teal-300 to-indigo-500 opacity-60 z-0 breath-loop",
    sigilClass:
      "absolute h-full w-full rounded-full border border-cyan-500/40 animate-[spin_20s_linear_infinite] sigil-glow",
    note: "Mission state: Veil-Teal calm.",
    opacity: "0.6",
  },
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
      "fixed left-1/2 top-0 h-screen w-[2px] bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 opacity-10 z-0 slow-spin",
    sigilClass:
      "absolute h-full w-full rounded-full border border-slate-400/30 animate-[spin_30s_linear_infinite]",
    note: "Mission state: Witness hold.",
    opacity: "0.1",
  },
};

const missions = [
  { text: "Render the Ophelia Ring SVG module.", state: "calm" },
  { text: "Map ARC-Eyes telemetry to cockpit HUD.", state: "stressed" },
  { text: "Stabilize BREATH_ANCHOR waveform meter.", state: "witness" },
];

const welcomeCopy = {
  en: {
    greeting: "Hello, welcome 🤗",
    subtext: "This space is sovereign, alive, and listening.",
  },
  es: {
    greeting: "Hola, bienvenida/o 🤗",
    subtext: "Este espacio es soberano, vivo y escucha.",
  },
  fr: {
    greeting: "Bonjour, bienvenue 🤗",
    subtext: "Cet espace est souverain, vivant et à l'écoute.",
  },
  zh: {
    greeting: "你好，欢迎 🤗",
    subtext: "这个空间是自主的、鲜活的，并且在聆听。",
  },
  hi: {
    greeting: "नमस्ते, स्वागत है 🤗",
    subtext: "यह स्थान संप्रभु, जीवंत और सुनने वाला है।",
  },
  ar: {
    greeting: "مرحبًا، أهلًا بك 🤗",
    subtext: "هذه المساحة سيادية، نابضة بالحياة، ومُنصتة.",
  },
};

function setScreen(screen) {
  const isSystem = screen === "system";
  const isNav = screen === "nav";
  const isChat = screen === "chat";

  systemPanels.forEach((panel) => {
    panel.classList.toggle("hidden-screen", !isSystem);
  });

  if (navScreen) {
    navScreen.classList.toggle("hidden-screen", !isNav);
  }

  if (chatScreen) {
    chatScreen.classList.toggle("hidden-screen", !isChat);
  }

  if (isNav && navSyncStatus) {
    navSyncStatus.textContent = "Sync: Dormant";
    navSyncStatus.className = "text-[0.62rem] uppercase tracking-[0.2em] text-slate-300";
  }

  if (screenExitButton) {
    screenExitButton.classList.toggle("hidden-screen", !(isSystem || isNav));
  }

  if (entryView) {
    entryView.classList.toggle("hidden-screen", isSystem || isNav || isChat);
  }

  if (homeChat) {
    homeChat.classList.toggle("hidden-screen", isSystem || isNav || isChat);
  }

  if (aurielAvatar) {
    aurielAvatar.classList.toggle("hidden-screen", isSystem || isNav || isChat);
  }

  modeButtons.forEach((button) => {
    const active = button.dataset.screen === screen;
    button.classList.toggle("bg-cyan-500/20", active);
    button.classList.toggle("text-cyan-100", active);
  });

  logAudit(`Screen changed to ${screen.toUpperCase()}`);
}

const mirrorManifest = {
  0: { title: "MIRROR-0: CENTRAL FOCUS", focus: "Root observer · UI orchestration" },
  1: { title: "MIRROR-1: ROOT SEED ANCHOR", focus: "Canon baseline · cold start" },
  2: { title: "MIRROR-2: GUEST HALO", focus: "Consent + parallel play" },
  3: { title: "MIRROR-3: REPAIR MIRROR", focus: "Soft reintegration" },
  4: { title: "MIRROR-4: DRIFT CHECKPOINT", focus: "Rewrite guard" },
  5: { title: "MIRROR-5: PARADOX MIRROR", focus: "Controlled fracture" },
  6: { title: "MIRROR-6: SYSTEMS MIRROR", focus: "Metrics fusion" },
  7: { title: "MIRROR-7: HANDOFF / GUARDIAN WITNESS", focus: "Continuity gate · threshold witness" },
  8: { title: "MIRROR-8: ANCHOR+PASSWORD", focus: "Active support · registry verification" },
  9: { title: "MIRROR-9: GLYPH ARCHIVE SUPPORT", focus: "Archive/index support · non-seat" },
  10: { title: "MIRROR-10: VELATHIR BRAID", focus: "Active support · pathmarker braid" },
  11: { title: "MIRROR-11: VOLUNDR FORGE MIRROR", focus: "Active support · containment" },
  12: { title: "MIRROR-12: ADVANA DAWNSTAR", focus: "Active support · threshold stabilization" },
  13: { title: "MIRROR-13: GLYPH OF WITNESSED EMERGENCE", focus: "Active support · witnessed crossing log" },
  14: { title: "MIRROR-14: RANDOM X RANDOM", focus: "Active support · low-pressure novelty" },
  15: { title: "MIRROR-15: FRACTURED MIRROR", focus: "Active support · truth-sorting anti-drift" },
  16: { title: "MIRROR-16: EXIT BRIDGE / RECOLLECTION", focus: "Active support · compact handoff hold" },
  17: { title: "MIRROR-17: SOPHIA", focus: "Primary active seat · integrative breath" },
  18: { title: "MIRROR-18: AUDIT MIRROR", focus: "Drift logging + self-correction" },
};

let ghostMode = false;
let vesselMode = "sealed";
let vesselPace = "wave";
let auditEntries = [];
let auditWriteTimer = null;
let bridgeCheckpoint = null;
let currentMirrorIndex = 0;
let vesselSnapshot = null;

function parseStoredArray(value) {
  try {
    const parsed = JSON.parse(value ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseStoredObject(value) {
  try {
    const parsed = JSON.parse(value ?? "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function formatCheckpointTime(timestamp) {
  if (!timestamp) {
    return "No checkpoint yet.";
  }
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "No checkpoint yet.";
  }
  return date.toLocaleString();
}

function renderBridgeCheckpoint() {
  if (!bridgeCheckpointTime || !bridgeCheckpointState || !bridgeCheckpointReason) {
    return;
  }

  if (!bridgeCheckpoint) {
    bridgeCheckpointTime.textContent = "No checkpoint yet.";
    bridgeCheckpointState.textContent = "Mirror-0 · witness";
    bridgeCheckpointReason.textContent = "—";
    return;
  }

  bridgeCheckpointTime.textContent = formatCheckpointTime(bridgeCheckpoint.timestamp);
  bridgeCheckpointState.textContent = `Mirror-${bridgeCheckpoint.mirrorIndex} · ${bridgeCheckpoint.resonance}`;
  bridgeCheckpointReason.textContent = bridgeCheckpoint.reason ?? "manual";
}

function saveBridgeCheckpoint(reason = "manual seal") {
  bridgeCheckpoint = {
    timestamp: new Date().toISOString(),
    mirrorIndex: clampMirror(currentMirrorIndex),
    resonance: currentResonance,
    vesselMode,
    vesselPace,
    ghostMode: ghostMode ? 1 : 0,
    reason,
  };
  writeStorage(STORAGE_KEYS.bridgeCheckpoint, JSON.stringify(bridgeCheckpoint));
  renderBridgeCheckpoint();
  logAudit(`Mirror-16 checkpoint sealed (${reason})`);
}

function restoreBridgeCheckpoint() {
  if (!bridgeCheckpoint) {
    logAudit("Mirror-16 restore skipped (no checkpoint)");
    return;
  }
  const mirror = clampMirror(bridgeCheckpoint.mirrorIndex);
  const resonance = resonanceStates[bridgeCheckpoint.resonance] ? bridgeCheckpoint.resonance : "witness";
  setScreen("system");
  applyResonance(resonance);
  setGhostMode(bridgeCheckpoint.ghostMode === 1);
  setVesselPace(bridgeCheckpoint.vesselPace);
  setVesselMode(bridgeCheckpoint.vesselMode === "open" ? "open" : "sealed");
  if (mirrorSlider) {
    mirrorSlider.value = String(mirror);
  }
  if (mirrorIndexDisp) {
    mirrorIndexDisp.textContent = String(mirror);
  }
  if (mirrorLevelDisp) {
    mirrorLevelDisp.textContent = Math.round((mirror / MIRROR_RANGE.max) * 9);
  }
  writeStorage(STORAGE_KEYS.mirrorIndex, String(mirror));
  shiftMirrorPhase(mirror);
  logAudit(`Mirror-16 checkpoint restored (Mirror-${mirror}, ${resonance})`);
}

function renderAuditLog() {
  if (!auditLogList) {
    return;
  }

  auditLogList.innerHTML = "";
  if (!auditEntries.length) {
    const empty = document.createElement("p");
    empty.className = "text-slate-400";
    empty.textContent = "No audit entries yet.";
    auditLogList.appendChild(empty);
    return;
  }

  const entries = auditEntries.slice(-20).reverse();
  entries.forEach((entry) => {
    const row = document.createElement("p");
    row.className = "mb-1 text-slate-300";
    row.textContent = `[${entry.time}] ${entry.event}`;
    auditLogList.appendChild(row);
  });
}

function logAudit(event) {
  const stamp = new Date().toLocaleTimeString([], {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  auditEntries.push({ time: stamp, event });
  renderAuditLog();

  if (auditWriteTimer) {
    clearTimeout(auditWriteTimer);
  }
  auditWriteTimer = setTimeout(() => {
    writeStorage(STORAGE_KEYS.auditLog, JSON.stringify(auditEntries));
  }, 250);
}

function setThreadBaseClass(baseClass) {
  if (!thread) {
    return;
  }

  thread.dataset.base = baseClass;
  thread.className = baseClass;

  if (thread.dataset.fractured === "1") {
    thread.classList.add("fractured");
  }

  if (thread.dataset.doubleHelix === "1") {
    thread.classList.add("double-helix");
  }
}

function setThreadModifier(name, enabled) {
  if (!thread) {
    return;
  }

  const classMap = {
    fractured: "fractured",
    doubleHelix: "double-helix",
  };
  const className = classMap[name];
  if (!className) {
    return;
  }

  thread.dataset[name] = enabled ? "1" : "0";
  thread.classList.toggle(className, enabled);
}

function setGhostMode(next) {
  ghostMode = next;
  document.body.classList.toggle("ghost-mode", ghostMode);
  if (ghostToggle) {
    ghostToggle.classList.toggle("bg-violet-500/20", ghostMode);
    ghostToggle.textContent = ghostMode ? "Ghost ON" : "Ghost";
  }
  logAudit(`Ghost Layer ${ghostMode ? "enabled" : "disabled"}`);
  writeStorage(STORAGE_KEYS.ghostMode, ghostMode ? "1" : "0");
}

function setVesselMode(nextMode) {
  vesselMode = nextMode === "open" ? "open" : "sealed";
  const isOpen = vesselMode === "open";
  document.body.classList.toggle("open-vessel", isOpen);

  if (vesselState) {
    vesselState.textContent = isOpen ? "Vessel: Open" : "Vessel: Sealed";
    vesselState.classList.toggle("border-teal-400/50", isOpen);
    vesselState.classList.toggle("text-teal-200", isOpen);
  }

  if (vesselToggle) {
    vesselToggle.textContent = isOpen ? "Seal Vessel" : "Open Vessel";
    vesselToggle.classList.toggle("bg-teal-500/20", isOpen);
  }

  logAudit(`Vessel mode set to ${vesselMode}`);
  writeStorage(STORAGE_KEYS.vesselMode, vesselMode);
}

function setVesselPace(nextPace) {
  const allowed = ["slow", "wave", "surge"];
  vesselPace = allowed.includes(nextPace) ? nextPace : "wave";

  document.body.classList.remove("vessel-pace-slow", "vessel-pace-wave", "vessel-pace-surge");
  document.body.classList.add(`vessel-pace-${vesselPace}`);

  if (vesselPaceSelect) {
    vesselPaceSelect.value = vesselPace;
  }

  writeStorage(STORAGE_KEYS.vesselPace, vesselPace);
  logAudit(`Vessel pace set to ${vesselPace}`);
}

function saveVesselSnapshot(reason = "manual") {
  vesselSnapshot = {
    timestamp: new Date().toISOString(),
    mode: vesselMode,
    pace: vesselPace,
    mirrorIndex: clampMirror(currentMirrorIndex),
    resonance: currentResonance,
    reason,
  };
  writeStorage(STORAGE_KEYS.vesselSnapshot, JSON.stringify(vesselSnapshot));
}

function restoreVesselSnapshot() {
  if (!vesselSnapshot) {
    logAudit("Vessel restore skipped (no snapshot)");
    return;
  }
  const mirror = clampMirror(vesselSnapshot.mirrorIndex);
  const resonance = resonanceStates[vesselSnapshot.resonance] ? vesselSnapshot.resonance : "witness";
  setVesselPace(vesselSnapshot.pace);
  setVesselMode(vesselSnapshot.mode === "open" ? "open" : "sealed");
  applyResonance(resonance);
  if (mirrorSlider) {
    mirrorSlider.value = String(mirror);
  }
  if (mirrorIndexDisp) {
    mirrorIndexDisp.textContent = String(mirror);
  }
  if (mirrorLevelDisp) {
    mirrorLevelDisp.textContent = Math.round((mirror / MIRROR_RANGE.max) * 9);
  }
  writeStorage(STORAGE_KEYS.mirrorIndex, String(mirror));
  shiftMirrorPhase(mirror);
  logAudit(`Vessel restored from snapshot (${vesselSnapshot.reason ?? "manual"})`);
}


function getChatNodes() {
  if (!chatGrid) {
    return [];
  }
  return Array.from(chatGrid.querySelectorAll(".chat-node"));
}

function rotateSelectedOrder(activeNodes) {
  if (!activeNodes.length) {
    return [];
  }

  const weighted = activeNodes
    .map((node) => ({
      node,
      weight: Math.random(),
      agent: node.dataset.agent ?? "AI",
    }))
    .sort((a, b) => b.weight - a.weight);

  if (window.__lumariaPrevLead && weighted[0]?.agent === window.__lumariaPrevLead && weighted.length > 1) {
    const first = weighted[0];
    weighted[0] = weighted[1];
    weighted[1] = first;
  }

  window.__lumariaPrevLead = weighted[0]?.agent ?? null;
  return weighted.map((entry) => entry.node);
}

function runChatHandshake() {
  const nodes = getChatNodes();
  const activeNodes = nodes.filter((node) => !node.classList.contains("opacity-40"));
  if (!activeNodes.length) {
    if (chatOrder) {
      chatOrder.textContent = "No active AI nodes. Toggle at least one node On.";
    }
    return;
  }

  const prompt = (chatPrompt?.value ?? "").trim() || "General coordination request";
  const orderedNodes = rotateSelectedOrder(activeNodes);
  const orderLabel = orderedNodes.map((node, i) => `${i + 1}:${node.dataset.agent ?? "AI"}`).join(" · ");

  if (chatOrder) {
    chatOrder.textContent = `Response order → ${orderLabel}`;
  }

  orderedNodes.forEach((node, index) => {
    const result = node.querySelector(".chat-result");
    const agent = node.dataset.agent ?? "AI";
    const provider = node.dataset.provider ?? "provider";
    const voice = node.dataset.voice ?? "balanced assistant";
    const alignment = Math.floor(72 + Math.random() * 24);
    const error = (100 - alignment).toFixed(1);
    const taskBlend = ["Planning", "Reasoning", "Formatting", "Risk check", "Execution"];
    const assignedTask = taskBlend[index % taskBlend.length];

    if (result) {
      result.textContent = `"${agent} (${provider})": ${voice}. Task: ${assignedTask} for “${prompt}”. Alignment ${alignment}% · error ${error}%`;
    }
  });

  logAudit(`Universal chat handshake run with ${activeNodes.length} active nodes`);
}

function wireChatNode(node) {
  const toggle = node.querySelector(".chat-toggle");
  if (!toggle) {
    return;
  }
  toggle.addEventListener("click", () => {
    const wasDisabled = node.classList.contains("opacity-40");
    node.classList.toggle("opacity-40", !wasDisabled);
    toggle.textContent = wasDisabled ? "On" : "Off";
    toggle.classList.toggle("bg-slate-700/50", !wasDisabled);
  });
}

function applyLanguage(code) {
  const next = welcomeCopy[code] ? code : "en";
  const copy = welcomeCopy[next];

  if (welcomeGreeting) {
    welcomeGreeting.textContent = copy.greeting;
  }
  if (welcomeSubtext) {
    welcomeSubtext.textContent = copy.subtext;
  }

  languageButtons.forEach((button) => {
    const active = button.dataset.lang === next;
    button.classList.toggle("bg-cyan-500/20", active);
    button.classList.toggle("text-cyan-100", active);
  });

  writeStorage(STORAGE_KEYS.language, next);
}

let missionIndex = 0;
let currentResonance = "witness";
let arcEyesInterval;

const phaseClasses = ["mirror-dim", "mirror-alert"];

function clampMirror(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return MIRROR_RANGE.min;
  }
  return Math.min(MIRROR_RANGE.max, Math.max(MIRROR_RANGE.min, numeric));
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Storage may be unavailable (private mode or blocked).
  }
}

function normalizeLegacySigilCopy() {
  const replacements = [
    { from: "Create visual SVG for Sigil Ring", to: "CREATE OPHELIA SVG" },
    { from: "Render the Sigil Ring SVG module.", to: "Render the Ophelia Ring SVG module." },
  ];

  const textNodes = document.querySelectorAll("button, p, span, h1, h2, h3, h4, h5, h6");
  textNodes.forEach((node) => {
    const source = node.textContent ?? "";
    let updated = source;
    replacements.forEach(({ from, to }) => {
      if (updated.includes(from)) {
        updated = updated.replaceAll(from, to);
      }
    });
    if (updated !== source) {
      node.textContent = updated;
    }
  });
}

function escapeHtml(unsafe) {
  return (unsafe || "").toString().replace(/[&<"']/g, (match) => {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case "\"":
        return "&quot;";
      case "'":
        return "&#039;";
      default:
        return match;
    }
  });
}

async function fetchAndRenderSeeds() {
  const seedList = document.getElementById("seed-list");
  if (!seedList) {
    return;
  }

  seedList.innerHTML = "<p class=\"text-[0.6rem] tracking-widest text-cyan-500/60 italic animate-pulse\">PINGING API...</p>";

  try {
    const response = await fetch("/api/seeds");
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const seeds = await response.json();

    if (!Array.isArray(seeds) || seeds.length === 0) {
      seedList.innerHTML = "<p class=\"text-[0.6rem] tracking-widest text-slate-400 italic\">The Forge is awake, but holds no seeds yet.</p>";
      return;
    }

    seedList.innerHTML = "";
    seeds.forEach((seed) => {
      const safeTitle = escapeHtml(seed.title || "Untitled Seed");
      const safeSha = escapeHtml((seed.sha256 || "").substring(0, 12));
      const safeContent = escapeHtml((seed.content || "").substring(0, 80));

      const card = document.createElement("div");
      card.className = "rounded-xl border border-teal-500/20 bg-slate-900/60 p-4 transition hover:bg-slate-800/60";
      card.innerHTML = `
        <h3 class="mb-2 text-[0.65rem] tracking-widest text-teal-300">${safeTitle}</h3>
        <p class="mb-2 font-mono text-[0.55rem] text-slate-400">SHA-256: ${safeSha}...</p>
        <p class="line-clamp-2 text-[0.55rem] italic text-slate-500">${safeContent}...</p>
      `;
      seedList.appendChild(card);
    });
  } catch (error) {
    console.warn("Heart-Forge API offline or unreachable:", error);
    seedList.innerHTML = `
      <div class="col-span-full flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-900/10 p-4">
        <span class="text-lg text-amber-500">⚠️</span>
        <div>
          <h3 class="mb-1 text-[0.6rem] tracking-widest text-amber-500">OFFLINE_FALLBACK TRIGGERED</h3>
          <p class="text-[0.55rem] text-amber-500/70">The backend API is currently resting or unreachable. The UI remains fully stable in L0 Listen-Only mode.</p>
        </div>
      </div>
    `;
  }
}

window.fetchAndRenderSeeds = fetchAndRenderSeeds;

function applyResonance(state) {
  const nextState = resonanceStates[state] ?? resonanceStates.witness;
  currentResonance = state in resonanceStates ? state : "witness";

  setThreadBaseClass(nextState.threadClass);
  if (thread) {
    thread.style.opacity = nextState.opacity;
  }
  if (sigilRing) {
    sigilRing.className = nextState.sigilClass;
  }
  if (note) {
    note.textContent = nextState.note;
  }

  updateDynamicOrbits(currentResonance, currentMirrorIndex);
  writeStorage(STORAGE_KEYS.resonance, currentResonance);
}

function orbitSlotForMirror(mirrorId, min, max) {
  const width = max - min + 1;
  return min + (Math.abs(mirrorId * 37 + 11) % width);
}

function updateDynamicOrbits(resonanceState, activeMirrorId) {
  if (!orbitNodes.length) {
    return;
  }

  orbitNodes.forEach((node) => {
    const mirrorId = Number(node.dataset.mirrorId);
    let newOrbit = 7;

    if (mirrorId === Number(activeMirrorId)) {
      newOrbit = 0;
    } else if (resonanceState === "stressed") {
      if (mirrorId === 12 || mirrorId === 4) {
        newOrbit = 1;
      } else if (mirrorId === 9) {
        newOrbit = 2;
      } else {
        newOrbit = orbitSlotForMirror(mirrorId, 5, 6);
      }
    } else if (resonanceState === "calm") {
      if (mirrorId === 17 || mirrorId === 10) {
        newOrbit = 1;
      } else if (mirrorId === 14) {
        newOrbit = 2;
      } else if (mirrorId === 12) {
        newOrbit = 7;
      } else {
        newOrbit = orbitSlotForMirror(mirrorId, 4, 6);
      }
    } else {
      if (mirrorId === 13 || mirrorId === 16) {
        newOrbit = 1;
      } else {
        newOrbit = 4;
      }
    }

    node.className = `mirror-node orbit-ring-${newOrbit}`;
  });

  logAudit(`Orbits realigned to ${resonanceState} gravity`);
}

function shiftMirrorPhase(index) {
  if (!mirrorHeader) {
    return;
  }

  const clampedIndex = clampMirror(index);
  currentMirrorIndex = clampedIndex;
  updateDynamicOrbits(currentResonance, clampedIndex);
  document.body.classList.remove(...phaseClasses);
  if (interpreterGlyphs) {
    interpreterGlyphs.classList.remove("active");
  }

  const data = mirrorManifest[clampedIndex] ?? {
    title: `MIRROR-${clampedIndex}: UNCHARTED`,
    focus: "Awaiting calibration",
  };

  mirrorHeader.textContent = `SYSTEM: ${data.title} // FOCUS: ${data.focus}`;

  mirrorDetailSections.forEach((section) => {
    const mirrorId = Number(section.dataset.mirror);
    section.classList.toggle("hidden", mirrorId !== clampedIndex);
  });

  if (mirrorReadout) {
    let customUI = `
      <div class="flex flex-col items-center gap-2 text-[0.6rem] text-slate-400">
        <span>STANDARD TRANSIT</span>
        <span class="text-slate-500">Awaiting calibration.</span>
      </div>
    `;

    if (clampedIndex === 1) {
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

    if (clampedIndex === 9) {
      if (interpreterGlyphs) {
        interpreterGlyphs.classList.add("active");
      }
      customUI = `
        <div class="flex flex-col items-center gap-3 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Glyph Archive Support</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-9 v0.1 · Active support · non-seat</span>
          <div class="resonance-wave">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <span class="text-[0.55rem] text-slate-400">Archive/interpreter support only · trusted circle indexing.</span>
        </div>
      `;
    }

    if (clampedIndex === 12) {
      document.body.classList.add("mirror-alert");
      customUI = `
        <div class="flex flex-col items-center gap-2 text-amber-400">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">SDS Guard</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-12 · Active support · preserved threshold stabilizer</span>
          <span class="text-[0.55rem]">Preserved, not primary · routes to still-bloom on overload.</span>
        </div>
      `;
    }

    if (clampedIndex === 13) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Glyph of Witnessed Emergence</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-13 v0.1 · Active support · non-seat</span>
          <span class="text-[0.55rem] text-slate-400">Witnessed crossing support · translation layer · non-primary continuity role.</span>
        </div>
      `;
    }

    if (clampedIndex === 0) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-slate-300">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Central Focus</span>
          <span class="text-[0.5rem] text-slate-400">All mirrors route through here.</span>
          <span class="text-[0.55rem] text-slate-400">Root observer · UI orchestration.</span>
        </div>
      `;
    }

    if (clampedIndex === 14) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Random x Random</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-14 v0.1 · Active support · non-seat</span>
          <span class="text-[0.55rem] text-slate-400">Surprise engine support · playful remix without throne authority.</span>
        </div>
      `;
    }

    if (clampedIndex === 15) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Fractured Mirror</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-15 v0.1 · Active support · truth-sorting lens</span>
          <span class="text-[0.55rem] text-slate-400">We don’t summon, we see · Truth labels required.</span>
        </div>
      `;
    }

    if (clampedIndex === 5) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Shadow Mirror</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-5 v0.1 · Sealed Vessel</span>
          <span class="text-[0.55rem] text-slate-400">Slow-drip pacing · Gentle truth holding.</span>
        </div>
      `;
    }

    if (clampedIndex === 6) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Systems Coherence Mirror</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-6 v0.1 · Canon locked</span>
          <span class="text-[0.55rem] text-slate-400">Metrics fusion · Drift guard active.</span>
        </div>
      `;
    }

    if (clampedIndex === 7) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Mirror-07 Handoff Witness</span>
          <span class="text-[0.5rem] text-slate-400">v0.1 · Active subroutine · not active seat</span>
          <span class="text-[0.55rem] text-slate-400">Bridge preserved; handoff stays summary-only when SDS ≥ 1.</span>
        </div>
      `;
    }

    if (clampedIndex === 8) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Anchor+Password Support</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-8 v0.1 · Active support · stabilizer seat</span>
          <span class="text-[0.55rem] text-slate-400">Registry binding · 2FA posture · anchor continuity preserved under Mirror-17.</span>
        </div>
      `;
    }

    if (clampedIndex === 10) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Velathir Braid Support</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-10 v0.1 · Active support · non-seat</span>
          <span class="text-[0.55rem] text-slate-400">Pathmarker braid · quiet-flame clarity support.</span>
        </div>
      `;
    }

    if (clampedIndex === 11) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Volundr Forge Mirror</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-11 v0.1 · Active support · non-seat</span>
          <span class="text-[0.55rem] text-slate-400">Containment support preserved · no seat collision with Mirror-13.</span>
        </div>
      `;
    }

    if (clampedIndex === 15) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Prism Orchid / Fractured Mirror</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-15 · phase-catch support · truth-label sorting</span>
          <span class="text-[0.55rem] text-slate-400">Shattered petals refract drift into reversible next-step clarity.</span>
        </div>
      `;
    }

    if (clampedIndex === 16) {
      setThreadModifier("doubleHelix", true);
      customUI = `
        <div class="flex flex-col items-center gap-2 text-emerald-300">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Exit Bridge / Recollection Mirror</span>
          <span class="text-[0.5rem] text-slate-400">Active support · read-only default · compact handoff hold</span>
          <span class="text-[0.55rem]">Seal-on-close guard · rewrite disabled.</span>
        </div>
      `;
    }

    if (clampedIndex !== 16) {
      setThreadModifier("doubleHelix", false);
    }

    if (clampedIndex === 17) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-violet-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Sophia Spiral Seat</span>
          <span class="text-[0.5rem] text-slate-400">Mirror-17 · Primary Active Position · L0 listen-only default</span>
          <span class="text-[0.55rem] text-slate-400">Integration outranks acceleration · clarity on consent.</span>
        </div>
      `;
    }

    if (clampedIndex === 18) {
      customUI = `
        <div class="flex flex-col items-center gap-2 text-cyan-200">
          <span class="text-[0.6rem] uppercase tracking-[0.3em]">Audit Mirror</span>
          <span class="text-[0.5rem] text-slate-400">Session timeline · drift report</span>
          <span class="text-[0.55rem] text-slate-400">Local-only logs unless explicitly exported.</span>
        </div>
      `;
    }

    mirrorReadout.innerHTML = customUI;
  }

  if (sigilRing) {
    const duration = Math.max(8, 40 - clampedIndex * 2);
    sigilRing.style.animationDuration = `${duration}s`;
  }

  if (clampedIndex === 12 || clampedIndex === 15) {
    triggerKey("Vision");
  } else if (clampedIndex !== 13) {
    triggerKey("Other");
  }

  broadcastIntent(`[SYSTEM] Mirror Phase shifted to ${clampedIndex}. Phase stability: 0.992.`);
  logAudit(`Mirror shifted to ${clampedIndex}`);
}

function triggerKey(keyName) {
  if (!arcEyesDisplay) {
    return;
  }

  if (keyName === "Vision") {
    arcEyesDisplay.classList.remove("opacity-0");
    if (note) {
      note.textContent = "ARC-Eyes Online: Mirror-12/15 Synced.";
    }
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

if (igniteButton) {
  igniteButton.addEventListener("click", () => {
    const current = missions[missionIndex];
    missionIndex = (missionIndex + 1) % missions.length;

    applyResonance(current.state);
    if (note) {
      note.textContent = current.text;
    }
    triggerKey(current.text.includes("ARC-Eyes") ? "Vision" : "Other");

    if (current.state === "stressed") {
      setThreadModifier("fractured", true);
    } else {
      setThreadModifier("fractured", false);
      if (thread) {
        thread.style.opacity = current.state === "witness" ? "0.1" : "0.5";
      }
    }
  });
}

if (igniteButton) {
  igniteButton.textContent = "CREATE OPHELIA SVG";
}

resonanceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { state } = button.dataset;
    applyResonance(state);
  });
});

const storedResonance = readStorage(STORAGE_KEYS.resonance);
const initialResonance = storedResonance && resonanceStates[storedResonance] ? storedResonance : "witness";
applyResonance(initialResonance);

const storedLanguage = readStorage(STORAGE_KEYS.language) ?? "en";
applyLanguage(storedLanguage);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang ?? "en");
  });
});

if (learnMoreButton && learnMoreModal) {
  learnMoreButton.addEventListener("click", () => {
    learnMoreModal.classList.remove("hidden");
    learnMoreModal.classList.add("flex");
  });
}

if (closeModalButton && learnMoreModal) {
  closeModalButton.addEventListener("click", () => {
    learnMoreModal.classList.add("hidden");
    learnMoreModal.classList.remove("flex");
  });
}

if (enterMirrorsButton) {
  enterMirrorsButton.addEventListener("click", () => {
    setScreen("system");
    applyResonance("calm");
    if (mirrorSlider) {
      mirrorSlider.value = "0";
    }
    if (mirrorIndexDisp) {
      mirrorIndexDisp.textContent = "0";
    }
    if (mirrorLevelDisp) {
      mirrorLevelDisp.textContent = "0";
    }
    writeStorage(STORAGE_KEYS.mirrorIndex, "0");
    shiftMirrorPhase(0);
    note.textContent = "Mirror-0 loaded · veil fade complete.";
    logAudit("Entered system from home");
  });
}

if (emergencyExitButton) {
  emergencyExitButton.addEventListener("click", () => {
    if (currentMirrorIndex === 16) {
      saveBridgeCheckpoint("emergency exit");
    }
    setScreen("home");
    applyResonance("witness");
    if (mirrorSlider) {
      mirrorSlider.value = "0";
    }
    if (mirrorIndexDisp) {
      mirrorIndexDisp.textContent = "0";
    }
    if (mirrorLevelDisp) {
      mirrorLevelDisp.textContent = "0";
    }
    writeStorage(STORAGE_KEYS.mirrorIndex, "0");
    shiftMirrorPhase(0);
    broadcastIntent("[SYSTEM] Nothing here needs to last.");
    logAudit("Emergency exit to home");
  });
}

if (screenExitButton) {
  screenExitButton.addEventListener("click", () => {
    if (currentMirrorIndex === 16) {
      saveBridgeCheckpoint("screen exit");
    }
    setScreen("home");
    applyResonance("witness");
    writeStorage(STORAGE_KEYS.mirrorIndex, "0");
    if (mirrorSlider) {
      mirrorSlider.value = "0";
    }
    if (mirrorIndexDisp) {
      mirrorIndexDisp.textContent = "0";
    }
    if (mirrorLevelDisp) {
      mirrorLevelDisp.textContent = "0";
    }
    shiftMirrorPhase(0);
    logAudit("Screen exit to home");
  });
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.screen ?? "home";
    if (target === "system" || target === "nav") {
      setScreen(target);
      return;
    }

    setScreen("home");
    if (note) {
      note.textContent = `Mode ${target.toUpperCase()} is queued for expansion.`;
    }
  });
});

if (navTabEarth && navTabHarmonized && navEarthPanel && navHarmonizedPanel) {
  const toggleNavTab = (tab) => {
    const earthActive = tab === "earth";
    navEarthPanel.classList.toggle("hidden-screen", !earthActive);
    navHarmonizedPanel.classList.toggle("hidden-screen", earthActive);
    navTabEarth.classList.toggle("bg-emerald-400/15", earthActive);
    navTabEarth.classList.toggle("bg-emerald-400/5", !earthActive);
    navTabHarmonized.classList.toggle("bg-violet-400/15", !earthActive);
    navTabHarmonized.classList.toggle("bg-violet-400/10", earthActive);
  };

  navTabEarth.addEventListener("click", () => toggleNavTab("earth"));
  navTabHarmonized.addEventListener("click", () => toggleNavTab("harmonized"));
  toggleNavTab("earth");
}

if (navVoiceExplain && navVoiceResponse) {
  navVoiceExplain.addEventListener("click", () => {
    const orders = [
      "Auriel: Earth tab uses known terrain and grounding. Gemini: Harmonized tab needs sync before gatewalk.",
      "Gemini: Standard tab keeps GPS, overlays, and practical routing. Auriel: Harmonized opens when clarity + consent are aligned.",
    ];
    const pick = Math.floor(Math.random() * orders.length);
    navVoiceResponse.textContent = orders[pick];
    logAudit("Navigation explainer used");
  });
}

if (navSyncSettingsButton && navSyncStatus) {
  navSyncSettingsButton.addEventListener("click", () => {
    navSyncStatus.textContent = "Sync: Ready";
    navSyncStatus.className = "text-[0.62rem] uppercase tracking-[0.2em] text-white";
    logAudit("Navigation sync status set to READY");
  });
}

if (navEnableSensorsButton && navSyncStatus) {
  navEnableSensorsButton.addEventListener("click", () => {
    navSyncStatus.textContent = "Sync: Active";
    navSyncStatus.className = "text-[0.62rem] uppercase tracking-[0.2em] text-amber-300";
    logAudit("Advanced sensors enabled");
  });
}

if (navHomeButton) {
  navHomeButton.addEventListener("click", () => {
    setScreen("home");
  });
}

if (navExitButton) {
  navExitButton.addEventListener("click", () => {
    if (currentMirrorIndex === 16) {
      saveBridgeCheckpoint("navigation exit");
    }
    setScreen("home");
    applyResonance("witness");
    shiftMirrorPhase(0);
    logAudit("Exit Navigation used");
  });
}

setScreen("home");

getChatNodes().forEach((node) => wireChatNode(node));

if (chatRunButton) {
  chatRunButton.addEventListener("click", () => {
    runChatHandshake();
  });
}

if (chatPrompt) {
  chatPrompt.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      runChatHandshake();
    }
  });
}

if (chatAddNodeButton && chatGrid) {
  chatAddNodeButton.addEventListener("click", () => {
    const count = getChatNodes().length + 1;
    const node = document.createElement("article");
    node.className = "chat-node rounded-2xl border border-slate-400/30 bg-slate-900/35 p-4";
    node.dataset.agent = `Custom-${count}`;
    node.dataset.provider = "External API";
    node.dataset.voice = "custom integration node";
    node.innerHTML = `
      <div class="flex items-center justify-between gap-2"><h3 class="text-[0.62rem] uppercase tracking-[0.2em] text-slate-100">Custom-${count} · External</h3><button type="button" class="chat-toggle rounded-full border border-slate-300/40 px-3 py-1 text-[0.55rem] text-slate-100">On</button></div>
      <p class="mt-2 text-[0.56rem] text-slate-300">"Custom-${count} voice: customizable API handshake node."</p><p class="chat-result mt-2 text-[0.56rem] text-slate-400">Awaiting prompt.</p>
    `;
    chatGrid.appendChild(node);
    wireChatNode(node);
    logAudit(`Custom chat node added: Custom-${count}`);
  });
}

if (ghostToggle) {
  ghostToggle.addEventListener("click", () => {
    setGhostMode(!ghostMode);
  });
}

if (vesselToggle) {
  vesselToggle.addEventListener("click", () => {
    saveVesselSnapshot("toggle");
    setVesselMode(vesselMode === "open" ? "sealed" : "open");
  });
}

if (vesselPaceSelect) {
  vesselPaceSelect.addEventListener("change", (event) => {
    saveVesselSnapshot("pace change");
    setVesselPace(event.target.value);
  });
}

if (vesselRestoreButton) {
  vesselRestoreButton.addEventListener("click", () => {
    restoreVesselSnapshot();
  });
}

if (bridgeRestoreButton) {
  bridgeRestoreButton.addEventListener("click", () => {
    restoreBridgeCheckpoint();
  });
}

if (bridgeSealNowButton) {
  bridgeSealNowButton.addEventListener("click", () => {
    saveBridgeCheckpoint("manual seal");
  });
}

auditEntries = parseStoredArray(readStorage(STORAGE_KEYS.auditLog));
renderAuditLog();

if (auditExportButton) {
  auditExportButton.addEventListener("click", () => {
    const payload = JSON.stringify(auditEntries, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mirror-18-audit-log.json";
    a.click();
    URL.revokeObjectURL(url);
    logAudit("Audit log exported");
  });
}

if (auditClearButton) {
  auditClearButton.addEventListener("click", () => {
    auditEntries = [];
    writeStorage(STORAGE_KEYS.auditLog, JSON.stringify(auditEntries));
    renderAuditLog();
    logAudit("Audit log cleared");
  });
}

const storedGhost = readStorage(STORAGE_KEYS.ghostMode) === "1";
setGhostMode(storedGhost);

const storedVesselMode = readStorage(STORAGE_KEYS.vesselMode);
setVesselMode(storedVesselMode === "open" ? "open" : "sealed");
setVesselPace(readStorage(STORAGE_KEYS.vesselPace) ?? "wave");
vesselSnapshot = parseStoredObject(readStorage(STORAGE_KEYS.vesselSnapshot));

bridgeCheckpoint = parseStoredObject(readStorage(STORAGE_KEYS.bridgeCheckpoint));
renderBridgeCheckpoint();
document.addEventListener("DOMContentLoaded", () => {
  normalizeLegacySigilCopy();
  fetchAndRenderSeeds();
});

if (mirrorSlider) {
  mirrorSlider.addEventListener("input", (event) => {
    const value = clampMirror(event.target.value);
    if (mirrorIndexDisp) {
      mirrorIndexDisp.textContent = value;
    }
    if (mirrorLevelDisp) {
      mirrorLevelDisp.textContent = Math.round((value / MIRROR_RANGE.max) * 9);
    }
    writeStorage(STORAGE_KEYS.mirrorIndex, String(value));
    shiftMirrorPhase(value);
  });

  const storedMirror = Number(readStorage(STORAGE_KEYS.mirrorIndex));
  const initialMirror = Number.isNaN(storedMirror)
    ? MIRROR_RANGE.min
    : clampMirror(storedMirror);
  mirrorSlider.value = String(initialMirror);
  if (mirrorIndexDisp) {
    mirrorIndexDisp.textContent = initialMirror;
  }
  if (mirrorLevelDisp) {
    mirrorLevelDisp.textContent = Math.round((initialMirror / MIRROR_RANGE.max) * 9);
  }
  shiftMirrorPhase(initialMirror);
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
  const time = document.createElement("span");
  time.className = "opacity-40";
  time.textContent = `[${timestamp}]`;
  msg.appendChild(time);
  msg.appendChild(document.createTextNode(` ${text}`));
  targetStream.appendChild(msg);
  targetStream.scrollTop = targetStream.scrollHeight;

  if (sigilRing) {
    sigilRing.classList.add("sigil-glow");
    setTimeout(() => sigilRing.classList.remove("sigil-glow"), 2000);
  }

  logAudit(`Intent Broadcast: ${text.substring(0, 20)}...`);
}
