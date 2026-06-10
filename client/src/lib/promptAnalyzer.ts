import { PromptData } from "@/contexts/PromptContext";

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

export function generateSchematicContent(promptData: PromptData): SchematicContent {
  const prompt = promptData.prompt.toLowerCase();
  
  // Detect system type from prompt
  const isConveyor = prompt.includes("conveyor");
  const isFactory = prompt.includes("factory") || prompt.includes("manufacturing");
  const isPump = prompt.includes("pump") || prompt.includes("water");
  const isRobot = prompt.includes("robot") || prompt.includes("robotic");
  const isMotor = prompt.includes("motor");
  
  // Extract component mentions
  const components: string[] = [];
  const connections: string[] = [];
  const notes: string[] = [];

  if (isConveyor) {
    components.push("Drive Motor (5-10 HP)", "Gearbox (10:1 ratio)", "Conveyor Belt", "Idler Pulleys", "Load Cells");
    components.push("VFD (Variable Frequency Drive)", "Emergency Stop", "Proximity Sensors");
    connections.push("AC Power → VFD → Motor");
    connections.push("Motor → Gearbox → Conveyor");
    connections.push("Sensors → PLC → HMI");
    notes.push("Conveyor speed: 0-100 m/min");
    notes.push("Load capacity: Up to 500 kg");
    notes.push("Emergency stop wired to all motor circuits");
  } else if (isFactory) {
    components.push("Main PLC (AC500)", "Distributed I/O Modules", "Safety Relay Module");
    components.push("Motor Starters (3x)", "Soft Starters", "Overload Relays");
    components.push("Inductive Sensors", "Photoelectric Sensors", "Emergency Stop Stations");
    connections.push("Main Power → Distribution Panel → Motor Starters");
    connections.push("All Sensors → PLC Input Modules");
    connections.push("PLC Output → Motor Control Circuits");
    notes.push("Redundant safety circuits implemented");
    notes.push("All motors have independent overload protection");
    notes.push("Safety-rated emergency stop system");
  } else if (isPump) {
    components.push("Centrifugal Pump", "Pump Motor (3 HP)", "Check Valve", "Pressure Gauge");
    components.push("Flow Meter", "Pressure Relief Valve", "Suction Filter");
    connections.push("Water Source → Suction Filter → Pump");
    connections.push("Pump Discharge → Check Valve → Pressure Gauge");
    connections.push("Pressure Relief → Tank Return");
    notes.push("Operating pressure: 0-10 bar");
    notes.push("Flow rate: 0-500 L/min");
    notes.push("Priming required before startup");
  } else if (isRobot) {
    components.push("Robot Arm (6-axis)", "Robot Controller", "Power Supply (48V)");
    components.push("Emergency Stop Pendant", "Safety Fence", "Light Curtains");
    connections.push("Power Supply → Robot Controller");
    connections.push("Controller → Robot Joints (6 motors)");
    connections.push("Safety Devices → Safety Controller");
    notes.push("Payload capacity: 50 kg");
    notes.push("Reach: 1.8 m");
    notes.push("Cycle time: 5-10 seconds per operation");
  } else {
    components.push("AC Motor (3-phase)", "Motor Starter", "Thermal Overload Relay");
    components.push("Contactor", "Emergency Stop Button", "Control Transformer");
    connections.push("AC Power → Motor Starter → Motor");
    connections.push("Control Circuit → Emergency Stop → Contactor Coil");
    notes.push("Motor Rating: 5 HP, 1500 RPM");
    notes.push("Full Load Current: 8.5 A");
    notes.push("Starter Type: DOL (Direct On Line)");
  }

  return {
    title: isConveyor ? "Conveyor System Schematic" : 
           isFactory ? "Factory Automation Schematic" :
           isPump ? "Pump System Schematic" :
           isRobot ? "Robotic System Schematic" :
           "Motor Control Schematic",
    description: promptData.prompt,
    components,
    connections,
    notes,
  };
}

export function generateIllustrationContent(promptData: PromptData): IllustrationContent {
  const prompt = promptData.prompt.toLowerCase();
  
  const isConveyor = prompt.includes("conveyor");
  const isFactory = prompt.includes("factory") || prompt.includes("manufacturing");
  const isPump = prompt.includes("pump") || prompt.includes("water");
  const isRobot = prompt.includes("robot") || prompt.includes("robotic");
  
  let title = "Industrial System Layout";
  let description = promptData.prompt;
  let keyFeatures: string[] = [];
  let layout = "Linear";

  if (isConveyor) {
    title = "Conveyor System Layout";
    keyFeatures = [
      "Modular belt conveyor system",
      "Multiple motor drive options",
      "Integrated safety barriers",
      "Real-time speed monitoring",
      "Scalable to multiple lines",
    ];
    layout = "Linear horizontal configuration";
  } else if (isFactory) {
    title = "Smart Factory Floor Layout";
    keyFeatures = [
      "Centralized control room",
      "Multiple production stations",
      "Automated material handling",
      "Real-time monitoring dashboards",
      "Integrated safety zones",
    ];
    layout = "Grid-based with safety zones";
  } else if (isPump) {
    title = "Pump Station Layout";
    keyFeatures = [
      "Vertical or horizontal pump mounting",
      "Suction and discharge manifolds",
      "Pressure and flow monitoring",
      "Automated pressure relief",
      "Vibration isolation pads",
    ];
    layout = "Compact modular design";
  } else if (isRobot) {
    title = "Robotic Workcell Layout";
    keyFeatures = [
      "6-axis collaborative robot",
      "Safety-rated fence system",
      "Integrated vision system",
      "Quick-change tool interface",
      "Operator pendant control",
    ];
    layout = "Compact cell with safety perimeter";
  } else {
    keyFeatures = [
      "Compact motor mounting",
      "Flexible coupling options",
      "Thermal management",
      "Noise reduction enclosure",
      "Easy maintenance access",
    ];
    layout = "Modular standalone unit";
  }

  return {
    title,
    description,
    keyFeatures,
    layout,
  };
}

export function generateSVGSchematic(content: SchematicContent): string {
  // Generate a more detailed SVG based on schematic content
  const componentCount = content.components.length;
  const spacing = Math.max(150, 800 / componentCount);
  
  let svg = `<svg viewBox="0 0 1000 500" class="w-full h-auto">
    <!-- Title -->
    <text x="500" y="30" text-anchor="middle" font-size="18" font-weight="bold">${content.title}</text>
    
    <!-- Power Source -->
    <circle cx="50" cy="100" r="25" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <text x="50" y="105" text-anchor="middle" font-size="10" font-weight="bold">AC</text>
    <text x="50" y="140" text-anchor="middle" font-size="9" fill="#666">Power</text>`;

  // Add components
  content.components.forEach((component, idx) => {
    const xPos = 150 + idx * spacing;
    svg += `
    <rect x="${xPos - 30}" y="70" width="60" height="60" fill="none" stroke="#1a1a1a" stroke-width="2"/>
    <text x="${xPos}" y="105" text-anchor="middle" font-size="8" font-weight="bold">${component.substring(0, 12)}</text>`;
  });

  // Add connections
  content.connections.forEach((connection, idx) => {
    svg += `
    <text x="50" y="${250 + idx * 25}" font-size="9" fill="#333">• ${connection}</text>`;
  });

  // Add notes
  svg += `<text x="50" y="380" font-size="10" font-weight="bold" fill="#1a1a1a">NOTES:</text>`;
  content.notes.forEach((note, idx) => {
    svg += `
    <text x="60" y="${400 + idx * 20}" font-size="8" fill="#666">- ${note}</text>`;
  });

  svg += `</svg>`;
  return svg;
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

export function generatePLCArchitecture(promptData: PromptData): PLCArchitecture {
  const prompt = promptData.prompt.toLowerCase();
  
  const isConveyor = prompt.includes("conveyor");
  const isFactory = prompt.includes("factory") || prompt.includes("manufacturing");
  const isPump = prompt.includes("pump") || prompt.includes("water");
  const isRobot = prompt.includes("robot") || prompt.includes("robotic");
  
  let title = "PLC Control Architecture";
  let cpuModule = "AC500-eCo CPU";
  let inputModules: string[] = [];
  let outputModules: string[] = [];
  let communicationModules: string[] = [];
  let memorySize = "512 KB";
  let scanTime = "10 ms";
  let powerSupply = "24 VDC";
  let notes: string[] = [];

  if (isConveyor) {
    title = "Conveyor PLC Control System";
    cpuModule = "AC500-eCo CPU with 256 I/O points";
    inputModules = [
      "DI532 Digital Input Module (32 channels)",
      "AI532 Analog Input Module (8 channels, 4-20mA)",
      "Proximity Sensor Inputs (8x)",
      "Emergency Stop Circuit",
    ];
    outputModules = [
      "DO532 Digital Output Module (32 channels)",
      "AO532 Analog Output Module (4 channels)",
      "Motor Contactor Outputs (3x)",
      "Alarm/Indicator Outputs (4x)",
    ];
    communicationModules = [
      "Ethernet Module (PROFINET)",
      "Serial Module (Modbus RTU)",
    ];
    memorySize = "1 MB Program + 512 KB Data";
    scanTime = "5 ms";
    powerSupply = "24 VDC, 10A";
    notes = [
      "Redundant safety circuits for emergency stop",
      "Real-time speed control via VFD communication",
      "Load cell monitoring integrated",
      "Predictive maintenance data logging",
    ];
  } else if (isFactory) {
    title = "Factory Automation PLC Architecture";
    cpuModule = "AC500-eCo CPU with 512 I/O points";
    inputModules = [
      "DI532 Digital Input Module (32 channels) x3",
      "AI532 Analog Input Module (8 channels) x2",
      "Temperature Sensor Inputs (16x)",
      "Pressure Sensor Inputs (16x)",
      "Vision System Interface",
    ];
    outputModules = [
      "DO532 Digital Output Module (32 channels) x3",
      "AO532 Analog Output Module (4 channels) x2",
      "Motor Starter Outputs (6x)",
      "Heating Element Control (4x)",
    ];
    communicationModules = [
      "Ethernet Module (PROFINET)",
      "Ethernet Module (EtherCAT)",
      "Serial Module (Modbus RTU)",
      "OPC-UA Gateway",
    ];
    memorySize = "2 MB Program + 1 MB Data";
    scanTime = "2 ms";
    powerSupply = "24 VDC, 20A";
    notes = [
      "Multi-zone safety system with SIL 3 rating",
      "Distributed I/O across production floor",
      "Cloud connectivity for remote monitoring",
      "Advanced diagnostics and predictive maintenance",
    ];
  } else if (isPump) {
    title = "Pump System PLC Architecture";
    cpuModule = "AC500-eCo CPU with 128 I/O points";
    inputModules = [
      "DI532 Digital Input Module (32 channels)",
      "AI532 Analog Input Module (8 channels)",
      "Pressure Transducer Inputs (4x)",
      "Flow Meter Inputs (2x)",
      "Temperature Sensor Inputs (2x)",
    ];
    outputModules = [
      "DO532 Digital Output Module (32 channels)",
      "AO532 Analog Output Module (4 channels)",
      "Pump Motor Contactor (1x)",
      "Valve Control Outputs (4x)",
    ];
    communicationModules = [
      "Ethernet Module (PROFINET)",
      "Serial Module (Modbus RTU)",
    ];
    memorySize = "512 KB Program + 256 KB Data";
    scanTime = "10 ms";
    powerSupply = "24 VDC, 5A";
    notes = [
      "Automatic pressure relief control",
      "Flow rate monitoring and logging",
      "Thermal protection enabled",
      "Low-power standby mode for energy efficiency",
    ];
  } else if (isRobot) {
    title = "Robotic System PLC Architecture";
    cpuModule = "AC500-eCo CPU with 256 I/O points";
    inputModules = [
      "DI532 Digital Input Module (32 channels) x2",
      "AI532 Analog Input Module (8 channels)",
      "Robot Joint Encoders (6x)",
      "Force/Torque Sensor Inputs (6x)",
      "Safety Fence Inputs (4x)",
    ];
    outputModules = [
      "DO532 Digital Output Module (32 channels) x2",
      "AO532 Analog Output Module (4 channels)",
      "Robot Motion Control Outputs (6x)",
      "Tool Changer Control (2x)",
    ];
    communicationModules = [
      "Ethernet Module (PROFINET)",
      "Real-time Ethernet (EtherCAT)",
      "Safety Communication Module",
    ];
    memorySize = "1 MB Program + 512 KB Data";
    scanTime = "4 ms";
    powerSupply = "48 VDC, 15A";
    notes = [
      "Safety-rated motion control (SIL 3)",
      "Real-time synchronization with robot controller",
      "Collision detection and prevention",
      "Vision system integration for part recognition",
    ];
  } else {
    inputModules = [
      "DI532 Digital Input Module (32 channels)",
      "AI532 Analog Input Module (8 channels)",
    ];
    outputModules = [
      "DO532 Digital Output Module (32 channels)",
      "AO532 Analog Output Module (4 channels)",
    ];
    communicationModules = [
      "Ethernet Module (PROFINET)",
      "Serial Module (Modbus RTU)",
    ];
    notes = [
      "Standard industrial PLC configuration",
      "Expandable I/O modules as needed",
      "Modular architecture for scalability",
    ];
  }

  return {
    title,
    cpuModule,
    inputModules,
    outputModules,
    communicationModules,
    memorySize,
    scanTime,
    powerSupply,
    notes,
  };
}
