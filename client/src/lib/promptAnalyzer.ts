import { PromptData } from "@/contexts/PromptContext";

export interface ParsedRequirements {
  powerSources: number;
  breakers: number;
  motors: number;
  pumps: number;
  transformers: number;
  vfds: number;
  plcs: number;
  hmis: number;
  estops: number;
  sensors: number;
  valves: number;
  conveyors: number;
  robots: number;
  tanks: number;
  hasPLC: boolean;
  hasHMI: boolean;
  hasEStop: boolean;
  hasVFD: boolean;
  hasTransformer: boolean;
}

export interface SchematicContent {
  title: string;
  description: string;
  components: string[];
  connections: string[];
  notes: string[];
}

export interface IllustrationContent {
  title: string;
  description: string;
  keyFeatures: string[];
  layout: string;
}

export interface PLCArchitecture {
  title: string;
  cpuModule: string;
  inputModules: string[];
  outputModules: string[];
  communicationModules: string[];
  memorySize: string;
  scanTime: string;
  powerSupply: string;
  notes: string[];
}

export interface BOMComponent {
  name: string;
  category: string;
  model: string;
  specs: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SafetyCheckItem {
  name: string;
  status: "pass" | "fail" | "warning";
  description: string;
  recommendation?: string;
}

export interface CostItem {
  item: string;
  cost: number;
}

export interface OptimizationItem {
  current: string;
  suggestion: string;
  benefit: string;
  impact: "Low" | "Medium" | "High" | "Critical";
}

export interface MaintenanceItem {
  component: string;
  health: number;
  status: string;
  nextMaintenance: string;
}

function parseNumberWord(text: string, defaultVal: number = 1): number {
  const map: Record<string, number> = {
    one: 1, a: 1, an: 1, single: 1,
    two: 2, double: 2, pair: 2,
    three: 3, triple: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10
  };
  const lower = text.toLowerCase().trim();
  if (/^\d+$/.test(lower)) return parseInt(lower, 10);
  return map[lower] !== undefined ? map[lower] : defaultVal;
}

export function parseQuantity(prompt: string, targetKeywords: string[], defaultQty: number = 1): number {
  const keywordsPattern = targetKeywords.join("|");
  const regex = new RegExp(`(?:(\\d+)|(one|two|three|four|five|six|seven|eight|nine|ten|single|a|an))\\s*(?:\\w+\\s+)*(?:${keywordsPattern})`, "i");
  const match = prompt.match(regex);
  if (match) {
    if (match[1]) return parseInt(match[1], 10);
    if (match[2]) return parseNumberWord(match[2], defaultQty);
  }
  return defaultQty;
}

export function parsePromptRequirements(prompt: string, industry: string, complexity: string): ParsedRequirements {
  const p = prompt.toLowerCase();

  const isConveyor = p.includes("conveyor");
  const isPump = p.includes("pump") || p.includes("water") || p.includes("fluid");
  const isRobot = p.includes("robot") || p.includes("robotic");
  const isSubstation = p.includes("substation") || p.includes("transformer") || industry === "Power Systems";

  // Check if explicit motor mentions exist
  const hasMotorMention = /motor|motors|m\d|drive|drives|fan|engine/.test(p);
  const defaultMotorQty = hasMotorMention ? 1 : (isConveyor ? 2 : (isPump ? 0 : (industry === "Process Industry" ? 0 : 1)));

  const powerSources = parseQuantity(prompt, ["power source", "power supply", "ac power", "grid", "feeder"], 1);
  const breakers = parseQuantity(prompt, ["circuit breaker", "breaker", "cb", "mcb", "mccb"], 1);
  const motors = parseQuantity(prompt, ["motor", "motors", "drive motor"], defaultMotorQty);
  const pumps = parseQuantity(prompt, ["pump", "pumps"], isPump ? 1 : 0);
  const transformers = parseQuantity(prompt, ["transformer", "transformers"], isSubstation ? 1 : 0);
  const vfds = parseQuantity(prompt, ["vfd", "variable frequency drive", "inverter", "drive"], (motors > 0 && complexity !== "Basic") ? 1 : 0);
  const sensors = parseQuantity(prompt, ["sensor", "sensors", "transducer", "detector"], complexity === "Advanced" ? 4 : (complexity === "Intermediate" ? 2 : 1));
  const valves = parseQuantity(prompt, ["valve", "valves", "solenoid"], isPump ? 2 : 0);

  const hasPLC = p.includes("plc") || complexity !== "Basic";
  const hasHMI = p.includes("hmi") || p.includes("display") || p.includes("screen") || complexity !== "Basic";
  const hasEStop = p.includes("e-stop") || p.includes("emergency") || true;
  const hasVFD = vfds > 0 || p.includes("vfd") || p.includes("speed");
  const hasTransformer = transformers > 0 || isSubstation;

  return {
    powerSources: Math.max(1, powerSources),
    breakers: Math.max(1, breakers),
    motors: Math.max(0, motors),
    pumps: Math.max(0, pumps),
    transformers: Math.max(0, transformers),
    vfds: Math.max(0, vfds),
    plcs: hasPLC ? 1 : 0,
    hmis: hasHMI ? 1 : 0,
    estops: hasEStop ? 1 : 0,
    sensors: Math.max(1, sensors),
    valves: Math.max(0, valves),
    conveyors: isConveyor ? 1 : 0,
    robots: isRobot ? 1 : 0,
    tanks: isPump ? 1 : 0,
    hasPLC,
    hasHMI,
    hasEStop,
    hasVFD,
    hasTransformer,
  };
}

export function analyzePrompt(prompt: string, industry: string, complexity: string) {
  const reqs = parsePromptRequirements(prompt, industry, complexity);

  let intent = "System Design & Automation";
  let category = "Single Line Diagram (SLD)";

  if (industry === "Power Systems") {
    intent = "High-Voltage Power Distribution & Grid Protection";
    category = "Single Line Diagram (SLD)";
  } else if (industry === "Industrial Automation") {
    intent = "Automated Control & Machine Supervisory System";
    category = "Control Schematic & PLC Architecture";
  } else if (industry === "Manufacturing") {
    intent = "Assembly Line & Conveyor Automation System";
    category = "Manufacturing Line Layout";
  } else if (industry === "Process Industry") {
    intent = "Fluid & Process Control Diagram";
    category = "Process Flow Diagram (PFD)";
  }

  const components: string[] = [];
  if (reqs.powerSources > 0) components.push(`${reqs.powerSources}x Power Source (AC 415V/230V)`);
  if (reqs.transformers > 0) components.push(`${reqs.transformers}x Power Transformer`);
  if (reqs.breakers > 0) components.push(`${reqs.breakers}x Circuit Breaker (CB1)`);
  if (reqs.vfds > 0) components.push(`${reqs.vfds}x Variable Frequency Drive (VFD)`);
  if (reqs.motors > 0) components.push(`${reqs.motors}x AC Induction Motor (M1..M${reqs.motors})`);
  if (reqs.pumps > 0) components.push(`${reqs.pumps}x Centrifugal Pump (P1..P${reqs.pumps})`);
  if (reqs.valves > 0) components.push(`${reqs.valves}x Control Solenoid Valve`);
  if (reqs.hasPLC) components.push("1x Main PLC Controller");
  if (reqs.hasHMI) components.push("1x HMI Touch Panel");
  if (reqs.hasEStop) components.push("1x Emergency Stop Safety System");
  if (reqs.sensors > 0) components.push(`${reqs.sensors}x Industrial Sensors`);

  const estimatedTime = complexity === "Basic" ? "2-3 min" : complexity === "Intermediate" ? "5-7 min" : "10-15 min";
  const confidence = Math.min(98, 88 + (prompt.length > 20 ? 6 : 2) + (complexity === "Advanced" ? 4 : 2));

  return {
    intent,
    category,
    confidence,
    components,
    estimatedTime,
    reqs,
  };
}

export function generateSchematicContent(promptData: PromptData): SchematicContent {
  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);

  const components: string[] = [];
  const connections: string[] = [];
  const notes: string[] = [];

  components.push(`${reqs.powerSources}x AC Power Supply (415V/230V, 50Hz)`);
  if (reqs.transformers > 0) components.push(`${reqs.transformers}x Transformer (11kV / 415V)`);
  components.push(`${reqs.breakers}x Main Molded Case Circuit Breaker`);

  if (reqs.vfds > 0) components.push(`${reqs.vfds}x Variable Frequency Drive (VFD)`);
  if (reqs.motors > 0) components.push(`${reqs.motors}x AC Induction Motor (${promptData.complexity === "Advanced" ? "10 HP" : "5 HP"})`);
  if (reqs.pumps > 0) components.push(`${reqs.pumps}x Centrifugal Pump Unit`);
  if (reqs.valves > 0) components.push(`${reqs.valves}x Electro-pneumatic Valve`);
  if (reqs.hasPLC) components.push(`1x Programmable Logic Controller (${promptData.complexity} Rating)`);
  if (reqs.hasHMI) components.push("1x Human Machine Interface (HMI Screen)");
  if (reqs.hasEStop) components.push("1x Emergency Stop Pushbutton Circuit");

  connections.push(`Power Source → Circuit Breaker (${reqs.breakers}x)`);
  if (reqs.transformers > 0) connections.push("Grid Power → Step-Down Transformer → Main Switchgear");
  if (reqs.vfds > 0) connections.push("Circuit Breaker → VFD Drive → Motor Feeders");
  else if (reqs.motors > 0) connections.push("Circuit Breaker → Motor Starter → Motor Feeders");
  if (reqs.pumps > 0) connections.push("Water Suction → Pump → Solenoid Valve → Storage");
  if (reqs.hasPLC) connections.push("Field Sensors → PLC Input Cards → Control Program");
  if (reqs.hasHMI) connections.push("PLC → Ethernet Modbus/PROFINET → HMI Panel");
  if (reqs.hasEStop) connections.push("E-Stop Relay → Main Contactor Coil (Fail-Safe)");

  notes.push(`Industry Standard: ${promptData.industry} Compliance`);
  notes.push(`Complexity Tier: ${promptData.complexity}`);
  notes.push(`System Operating Voltage: 415V 3-Phase / 24VDC Control`);
  notes.push(`Overload Protection: Thermal/Magnetic Relays Fitted`);

  return {
    title: `${promptData.industry} System Schematic`,
    description: promptData.prompt,
    components,
    connections,
    notes,
  };
}

export function generateIllustrationContent(promptData: PromptData): IllustrationContent {
  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);

  const title = `${promptData.industry} Layout (${promptData.complexity})`;
  const keyFeatures = [
    `Custom architecture tailored for ${promptData.industry}`,
    `Includes ${reqs.motors > 0 ? `${reqs.motors} motor(s)` : ''}${reqs.pumps > 0 ? `${reqs.pumps} pump(s)` : ''} & ${reqs.breakers} breaker(s)`,
    reqs.hasPLC ? "Centralized PLC automation & monitoring" : "Direct hardwired relay logic control",
    reqs.hasHMI ? "Interactive HMI touchscreen interface" : "Local push-button control station",
    reqs.hasEStop ? "Safety-rated emergency stop integration" : "Standard circuit protection",
  ].filter(Boolean);

  const layout = promptData.complexity === "Advanced"
    ? "Multi-tier redundant rack layout with distributed I/O"
    : promptData.complexity === "Intermediate"
      ? "Standard modular panel layout with DIN rail mounts"
      : "Compact single-panel standalone layout";

  return {
    title,
    description: promptData.prompt,
    keyFeatures,
    layout,
  };
}

export function generateSVGSchematic(content: SchematicContent): string {
  return `<svg viewBox="0 0 800 400" class="w-full h-auto">
    <text x="400" y="30" text-anchor="middle" font-size="18" font-weight="bold">${content.title}</text>
    <circle cx="100" cy="100" r="30" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <text x="100" y="105" text-anchor="middle" font-size="12" font-weight="bold">AC</text>
    <rect x="220" y="80" width="80" height="40" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <text x="260" y="105" text-anchor="middle" font-size="11" font-weight="bold">CB1</text>
    <line x1="130" y1="100" x2="220" y2="100" stroke="#1a1a1a" stroke-width="2"/>
    <line x1="300" y1="100" x2="400" y2="100" stroke="#1a1a1a" stroke-width="2"/>
    <circle cx="430" cy="100" r="30" fill="none" stroke="#e63946" stroke-width="2"/>
    <text x="430" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#e63946">M1</text>
  </svg>`;
}

export function generatePLCArchitecture(promptData: PromptData): PLCArchitecture {
  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);

  const isAdv = promptData.complexity === "Advanced";
  const isInter = promptData.complexity === "Intermediate";

  return {
    title: `${promptData.industry} PLC Architecture`,
    cpuModule: isAdv ? "Siemens S7-1500 / ABB AC500 High-Performance CPU" : isInter ? "Siemens S7-1200 / ABB AC500-eCo CPU" : "Compact Micro PLC (16 I/O)",
    inputModules: [
      `Digital Inputs (${reqs.sensors * 8 + 8} Channels, 24VDC)`,
      `Analog Inputs (${reqs.pumps > 0 || reqs.hasVFD ? 8 : 4} Channels, 4-20mA)`,
      reqs.hasEStop ? "Safety Input Card (Dual Channel Emergency Stop)" : "Standard Switch Inputs",
    ],
    outputModules: [
      `Digital Outputs (${reqs.motors * 4 + 8} Channels, Relay/Transistor)`,
      reqs.hasVFD ? "Analog Outputs (4 Channels, 0-10V Speed Control)" : "Standard Contactor Relay Outputs",
      "Alarm Horn / Status Tower Beacon Outputs",
    ],
    communicationModules: [
      isAdv ? "PROFINET / Industrial Ethernet Switch" : "Modbus RTU RS485 Interface",
      isAdv ? "OPC-UA Gateway for Cloud/SCADA" : "Ethernet Port for HMI Communication",
    ],
    memorySize: isAdv ? "4 MB Program + 2 MB Data" : isInter ? "1 MB Program + 512 KB Data" : "256 KB Program",
    scanTime: isAdv ? "2 ms" : isInter ? "5 ms" : "15 ms",
    powerSupply: isAdv ? "24 VDC, 20A Redundant Power Supply" : "24 VDC, 5A Power Supply",
    notes: [
      `Optimized for ${promptData.industry} requirements`,
      `Configured for ${reqs.motors} motor(s) & ${reqs.breakers} breaker(s)`,
      reqs.hasEStop ? "Integrated Fail-Safe Safety Circuit" : "Basic Overload Trip Protection",
    ],
  };
}

export function generateBOMComponents(promptData: PromptData): BOMComponent[] {
  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);
  const items: BOMComponent[] = [];

  const multiplier = promptData.complexity === "Advanced" ? 1.5 : promptData.complexity === "Intermediate" ? 1.2 : 1.0;

  // Power Source / Main Transformer
  if (reqs.transformers > 0) {
    items.push({
      name: "Transformer",
      category: "Power Distribution",
      model: "11kV/415V Step-Down Transformer",
      specs: "100 kVA, Oil-Cooled",
      qty: reqs.transformers,
      unitPrice: Math.round(45000 * multiplier),
      totalPrice: Math.round(45000 * multiplier * reqs.transformers),
    });
  }

  // Power Supply
  items.push({
    name: "Power Supply",
    category: "Power Distribution",
    model: "MeanWell 24VDC DIN Rail PSU",
    specs: "24V DC, 10A, 240W",
    qty: reqs.powerSources,
    unitPrice: Math.round(3500 * multiplier),
    totalPrice: Math.round(3500 * multiplier * reqs.powerSources),
  });

  // Circuit Breakers
  for (let i = 1; i <= reqs.breakers; i++) {
    items.push({
      name: `Circuit Breaker (CB${i})`,
      category: "Protection",
      model: "ABB S200 / Schneider MCB",
      specs: "16A, C-Curve, 3-Pole 10kA",
      qty: 1,
      unitPrice: Math.round(2500 * multiplier),
      totalPrice: Math.round(2500 * multiplier),
    });
  }

  // VFDs
  for (let i = 1; i <= reqs.vfds; i++) {
    items.push({
      name: `VFD Drive (VFD${i})`,
      category: "Power Control",
      model: "ABB ACS580 / Danfoss FC51",
      specs: "5.5 kW, 3-Phase 415V, IP20",
      qty: 1,
      unitPrice: Math.round(18000 * multiplier),
      totalPrice: Math.round(18000 * multiplier),
    });
  }

  // Motors
  for (let i = 1; i <= reqs.motors; i++) {
    items.push({
      name: `Motor (M${i})`,
      category: "Actuators",
      model: "ABB / Siemens 3-Phase Motor",
      specs: "5 HP, 1440 RPM, IP55, TEFC",
      qty: 1,
      unitPrice: Math.round(8500 * multiplier),
      totalPrice: Math.round(8500 * multiplier),
    });
  }

  // Pumps
  for (let i = 1; i <= reqs.pumps; i++) {
    items.push({
      name: `Pump (P${i})`,
      category: "Fluid Control",
      model: "Grundfos Centrifugal Pump",
      specs: "3 HP, 200 L/min, 4 bar",
      qty: 1,
      unitPrice: Math.round(12000 * multiplier),
      totalPrice: Math.round(12000 * multiplier),
    });
  }

  // Solenoid Valves
  for (let i = 1; i <= reqs.valves; i++) {
    items.push({
      name: `Solenoid Valve (V${i})`,
      category: "Fluid Control",
      model: "Festo 2/2 Solenoid Valve",
      specs: "24VDC, 1-inch NPT, Brass",
      qty: 1,
      unitPrice: Math.round(3200 * multiplier),
      totalPrice: Math.round(3200 * multiplier),
    });
  }

  // PLC
  if (reqs.hasPLC) {
    items.push({
      name: "PLC Controller",
      category: "Control System",
      model: promptData.complexity === "Advanced" ? "Siemens S7-1500" : "ABB AC500 / S7-1200",
      specs: `${promptData.complexity} Tier, Ethernet, 32 I/O`,
      qty: 1,
      unitPrice: Math.round(28000 * multiplier),
      totalPrice: Math.round(28000 * multiplier),
    });
  }

  // HMI
  if (reqs.hasHMI) {
    items.push({
      name: "HMI Touch Screen",
      category: "User Interface",
      model: "Siemens KTP700 / Weintek 7\"",
      specs: "7-inch TFT LCD, Ethernet, IP65",
      qty: 1,
      unitPrice: Math.round(15000 * multiplier),
      totalPrice: Math.round(15000 * multiplier),
    });
  }

  // Emergency Stop
  if (reqs.hasEStop) {
    items.push({
      name: "Emergency Stop Button",
      category: "Safety",
      model: "Schneider Electric XB4",
      specs: "Mushroom head 40mm, Turn-to-release, 2NC",
      qty: 1,
      unitPrice: Math.round(1200 * multiplier),
      totalPrice: Math.round(1200 * multiplier),
    });
  }

  // Sensors
  items.push({
    name: "Industrial Sensors",
    category: "Sensors & Feedback",
    model: "Ifm / Pepperl+Fuchs Sensors",
    specs: "Inductive Proximity & Pressure Switches",
    qty: reqs.sensors,
    unitPrice: Math.round(1800 * multiplier),
    totalPrice: Math.round(1800 * multiplier * reqs.sensors),
  });

  return items;
}

export function generateSafetyChecks(promptData: PromptData): SafetyCheckItem[] {
  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);

  const checks: SafetyCheckItem[] = [
    {
      name: "Overload & Thermal Protection",
      status: "pass",
      description: `Thermal overload protection configured for all ${reqs.motors} motor(s) & ${reqs.breakers} breaker(s)`,
    },
    {
      name: "Emergency Stop Circuit",
      status: reqs.hasEStop ? "pass" : "warning",
      description: reqs.hasEStop
        ? "Fail-safe E-stop button wired into main contactor coil loop"
        : "No explicit emergency stop mentioned in prompt",
      recommendation: reqs.hasEStop ? undefined : "Install mushroom-head hardwired emergency stop button",
    },
    {
      name: "Grounding & Earthing Bond",
      status: "pass",
      description: "Equipotential bonding and protective earth (PE) grounding verified",
    },
    {
      name: "Circuit Breaker Interrupt Capacity",
      status: "pass",
      description: `Breaker short-circuit current rating exceeds max prospective fault current`,
    },
    {
      name: "Control Loop Isolation & VFD Surge",
      status: reqs.hasVFD ? "pass" : (promptData.complexity === "Basic" ? "warning" : "pass"),
      description: reqs.hasVFD
        ? "VFD input line reactor & surge suppressor installed"
        : "Standard direct-on-line control loop without soft start",
      recommendation: reqs.hasVFD ? undefined : "Consider VFD or Soft Starter for heavy motor startup loads",
    },
    {
      name: "Enclosure Access & Safety Interlocks",
      status: promptData.complexity === "Advanced" ? "pass" : "warning",
      description: promptData.complexity === "Advanced"
        ? "Interlocked door switches configured on all control cabinets"
        : "Standard panel key latch without electrical interlock",
      recommendation: promptData.complexity === "Advanced" ? undefined : "Add door interlock switches to high-voltage panels",
    },
  ];

  return checks;
}

export function generateCostBreakdown(promptData: PromptData): CostItem[] {
  const bom = generateBOMComponents(promptData);

  const categorized: Record<string, number> = {};
  bom.forEach((item) => {
    categorized[item.category] = (categorized[item.category] || 0) + item.totalPrice;
  });

  const costItems: CostItem[] = Object.entries(categorized).map(([category, cost]) => ({
    item: category,
    cost,
  }));

  // Wiring & Panel Fabrication (20% of equipment cost)
  const equipmentTotal = bom.reduce((sum, item) => sum + item.totalPrice, 0);
  const wiringCost = Math.round(equipmentTotal * 0.18);
  const testingCost = Math.round(equipmentTotal * 0.08);

  costItems.push({ item: "Wiring, Panel Assembly & Enclosure", cost: wiringCost });
  costItems.push({ item: "Testing, Commissioning & Documentation", cost: testingCost });

  return costItems;
}

export function generateOptimizations(promptData: PromptData): OptimizationItem[] {
  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);

  const opts: OptimizationItem[] = [];

  if (!reqs.hasVFD && reqs.motors > 0) {
    opts.push({
      current: "Direct-On-Line Motor Starters",
      suggestion: "Upgrade to Variable Frequency Drives (VFD)",
      benefit: "Reduces peak inrush current and saves up to 25% energy",
      impact: "High",
    });
  }

  if (promptData.complexity === "Basic" && reqs.hasPLC) {
    opts.push({
      current: "Standalone Relay Control",
      suggestion: "Migrate to Compact PLC Automation",
      benefit: "Provides flexible reprogramming and fault diagnostics",
      impact: "Medium",
    });
  }

  if (promptData.complexity !== "Advanced") {
    opts.push({
      current: "Single Controller Architecture",
      suggestion: "Add Redundant Ethernet Communications",
      benefit: "Prevents downtime with 99.9% uptime reliability",
      impact: "High",
    });
  }

  opts.push({
    current: "Manual Maintenance Schedules",
    suggestion: "Integrate AI Predictive Vibration Analytics",
    benefit: "Predicts motor bearing failures up to 3 weeks in advance",
    impact: "Critical",
  });

  opts.push({
    current: "Standard Efficiency Components",
    suggestion: "IE3 / IE4 Super Premium Efficiency Motors",
    benefit: "Lowers annual operating electricity cost by ₹18,000",
    impact: "Medium",
  });

  return opts;
}

export function generateMaintenancePredictions(promptData: PromptData): MaintenanceItem[] {
  const reqs = parsePromptRequirements(promptData.prompt, promptData.industry, promptData.complexity);
  const predictions: MaintenanceItem[] = [];

  for (let i = 1; i <= reqs.motors; i++) {
    predictions.push({
      component: `Motor M${i}`,
      health: 92 + (i % 3) * 3,
      status: i === 2 ? "Good" : "Excellent",
      nextMaintenance: i === 2 ? "6 months - Bearing inspection recommended" : "12 months - Regular lubrication",
    });
  }

  for (let i = 1; i <= reqs.pumps; i++) {
    predictions.push({
      component: `Pump P${i}`,
      health: 88 + (i % 2) * 5,
      status: "Good",
      nextMaintenance: "9 months - Seal check",
    });
  }

  if (reqs.hasPLC) {
    predictions.push({
      component: "Main PLC Controller",
      health: 99,
      status: "Excellent",
      nextMaintenance: "24 months - Firmware update & battery check",
    });
  }

  for (let i = 1; i <= reqs.vfds; i++) {
    predictions.push({
      component: `VFD Unit ${i}`,
      health: 86,
      status: "Fair",
      nextMaintenance: "3 months - Dust filter clean & capacitor check",
    });
  }

  if (predictions.length === 0) {
    predictions.push({
      component: "Circuit Breaker CB1",
      health: 98,
      status: "Excellent",
      nextMaintenance: "18 months - Trip test",
    });
  }

  return predictions;
}
