// Prerender at build time (no dynamic data)
export const revalidate = false;

export const metadata = {
  title: 'Resume | Tomas Rojder',
  description: 'Resume and CV of Tomas Rojder, algorithm developer, robotics engineer, and control systems specialist.',
};

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-md pb-2xl last:border-b-0" style={{ borderBottom: `1px solid var(--border-color)` }}>
      <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      {children}
    </section>
  );
}

function ResumeItem({
  title,
  subtitle,
  period,
  description,
}: {
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
}) {
  return (
    <div className="space-y-sm">
      <div className="flex items-start justify-between gap-md">
        <div className="flex-grow">
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          {subtitle && (
            <p style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
          )}
        </div>
        {period && (
          <p className="text-sm whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{period}</p>
        )}
      </div>
      {description && (
        <p style={{ color: 'var(--text-secondary)' }}>{description}</p>
      )}
    </div>
  );
}

export default function Resume() {
  return (
    <div className="max-w-4xl mx-auto container py-2xl md:py-3xl space-y-2xl">
      {/* Header */}
      <div className="space-y-sm pb-2xl" style={{ borderBottom: `1px solid var(--border-color)` }}>
        <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Tomas Rojder
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Algorithm Developer & Robotics Engineer
        </p>
        <div className="flex flex-wrap gap-md text-sm" style={{ color: 'var(--text-secondary)' }}>
          <a href="mailto:tomas.rojder@gmail.com" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
            tomas.rojder@gmail.com
          </a>
          <span>•</span>
          <a href="https://github.com/2mazzz" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
            github.com/2mazzz
          </a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/tomasröjder" className="transition-colors hover:opacity-80" style={{ color: 'var(--primary)' }}>
            linkedin.com/in/tomasröjder
          </a>
        </div>
      </div>

      {/* Professional Summary */}
      <ResumeSection title="Professional Summary">
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Robotics and control systems engineer with expertise in autonomous systems, AI applications, and big data processing for advanced machinery. M.Sc. in Applied Physics and Electrical Engineering (Mechatronics and Control) from Linköping University. Proven track record developing control algorithms for agricultural automation, flight autonomy systems, and heat pump optimization. Strong foundation in C++, Python, MATLAB, and ROS with hands-on experience in SLAM, sensor fusion, and computer vision.
        </p>
      </ResumeSection>

      {/* Experience */}
      <ResumeSection title="Professional Experience">
        <div className="space-y-2xl">
          <ResumeItem
            title="Algorithm Developer"
            subtitle="Väderstad AB"
            period="2025 - Present"
            description="Developing control algorithms and big data solutions for advanced agricultural machines. Implementing real-time control systems in C++ and Python for optimizing machine performance, autonomous features, and precision agriculture applications. Working with large-scale sensor data processing and machine learning integration."
          />
          <ResumeItem
            title="Systems Engineer"
            subtitle="Saab AB"
            period="2024 - 2025"
            description="Contributed to flight autonomy capabilities for defense systems. Developed algorithms in C++, MATLAB, and Python for autonomous navigation, decision-making systems, and mission planning. Collaborated with cross-functional teams on safety-critical software for aerial vehicles."
          />
          <ResumeItem
            title="Software Developer"
            subtitle="Bosch Termoteknik AB"
            period="2023 - 2024"
            description="Developed control software for heat pump systems using Simulink, Python, and C++. Implemented optimization algorithms for energy efficiency, model-based control strategies, and system diagnostics. Conducted simulation and validation of control algorithms for thermal management systems."
          />
        </div>
      </ResumeSection>

      {/* Technical Skills */}
      <ResumeSection title="Technical Skills">
        <div className="space-y-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>
            <span className="font-semibold">Programming Languages:</span> C++, Python, MATLAB, Simulink
          </p>
          <p>
            <span className="font-semibold">Robotics & Autonomy:</span> ROS (Robot Operating System), SLAM, Sensor Fusion, Path Planning, Control Theory
          </p>
          <p>
            <span className="font-semibold">AI & Machine Learning:</span> PyTorch, TensorFlow, Reinforcement Learning, Computer Vision, OpenCV
          </p>
          <p>
            <span className="font-semibold">Control Systems:</span> PID Control, State-Space Methods, Kalman Filtering, Model Predictive Control
          </p>
          <p>
            <span className="font-semibold">Tools & Platforms:</span> Git, Docker, Linux, Gazebo Simulator, Point Cloud Library, CMake
          </p>
          <p>
            <span className="font-semibold">Domains:</span> Autonomous Systems, Agricultural Automation, Flight Systems, Big Data Processing
          </p>
        </div>
      </ResumeSection>

      {/* Education */}
      <ResumeSection title="Education">
        <ResumeItem
          title="M.Sc. Applied Physics & Electrical Engineering"
          subtitle="Linköping University, Sweden"
          period="2019 - 2024"
          description="Specialization in Mechatronics and Control Systems. Master thesis: 'Evaluation of SLAM Algorithms for Quadcopters' - investigating sensor fusion techniques combining IMU, camera, and depth sensors for autonomous navigation."
        />
      </ResumeSection>

      {/* Key Projects */}
      <ResumeSection title="Key Projects">
        <div className="space-y-md">
          <ResumeItem
            title="Quadcopter SLAM Evaluation"
            subtitle="Master Thesis Project"
            period="2024"
            description="Comprehensive evaluation of SLAM algorithms for autonomous quadcopter navigation. Implemented and compared multiple approaches for real-time localization and mapping using sensor fusion."
          />
          <ResumeItem
            title="Autonomous Navigation Research"
            subtitle="Personal Project"
            period="2025"
            description="Research combining classical control methods with reinforcement learning for adaptive path planning in dynamic environments. Implemented in ROS with Gazebo simulation."
          />
        </div>
      </ResumeSection>

      {/* Print Notice */}
      <div className="mt-2xl pt-2xl text-center text-sm" style={{ borderTop: `1px solid var(--border-color)`, color: 'var(--text-muted)' }}>
        <p>This resume is best viewed as a PDF. Use your browser's print function to save as PDF for a formatted copy.</p>
      </div>
    </div>
  );
}
