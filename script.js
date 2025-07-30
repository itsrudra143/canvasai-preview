// Enhanced Interactive Demo
class CanvasAIDemo {
  constructor() {
    this.init();
  }

  init() {
    this.initDeviceSelector();
    this.initCapabilityRotation();
    this.initProgressAnimation();
    this.initGalleryInteractions();
    this.initEditIndicators();
    this.initChatSimulation();
    this.initParticleSystem();
  }

  // Device selector functionality
  initDeviceSelector() {
    const deviceBtns = document.querySelectorAll(".device-btn");
    const mockup = document.querySelector(".website-mockup");
    const previewFrame = document.querySelector(".preview-frame");

    deviceBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        deviceBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const device = btn.dataset.device;

        // Apply device-specific transformations
        this.applyDeviceTransform(mockup, previewFrame, device);
      });
    });
  }

  applyDeviceTransform(mockup, frame, device) {
    // Remove existing device classes
    mockup.className = "website-mockup";

    switch (device) {
      case "tablet":
        mockup.style.transform = "scale(0.8)";
        mockup.style.maxWidth = "768px";
        mockup.style.margin = "0 auto";
        break;
      case "mobile":
        mockup.style.transform = "scale(0.6)";
        mockup.style.maxWidth = "375px";
        mockup.style.margin = "0 auto";
        // Adjust gallery grid for mobile
        const galleryGrid = mockup.querySelector(".gallery-grid");
        if (galleryGrid) {
          galleryGrid.style.gridTemplateColumns = "1fr";
          galleryGrid.style.gridTemplateRows = "repeat(6, 120px)";
        }
        break;
      default:
        mockup.style.transform = "scale(1)";
        mockup.style.maxWidth = "none";
        mockup.style.margin = "0";
        // Reset gallery grid
        const defaultGrid = mockup.querySelector(".gallery-grid");
        if (defaultGrid) {
          defaultGrid.style.gridTemplateColumns = "2fr 1fr 1fr";
          defaultGrid.style.gridTemplateRows = "1fr 1fr";
        }
    }

    // Add animation
    mockup.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  // AI capability rotation
  initCapabilityRotation() {
    const capabilities = document.querySelectorAll(".capability-item");
    let currentIndex = 0;

    setInterval(() => {
      capabilities.forEach((cap) => cap.classList.remove("active"));
      capabilities[currentIndex].classList.add("active");
      currentIndex = (currentIndex + 1) % capabilities.length;
    }, 3000);
  }

  // Progress animation
  initProgressAnimation() {
    const steps = document.querySelectorAll(".step");
    let currentStep = 0;

    const animateProgress = () => {
      // Reset all steps
      steps.forEach((step) => {
        step.classList.remove("active", "completed");
      });

      // Mark completed steps
      for (let i = 0; i < currentStep; i++) {
        steps[i].classList.add("completed");
      }

      // Mark current step as active
      if (currentStep < steps.length) {
        steps[currentStep].classList.add("active");
      }

      currentStep++;
      if (currentStep > steps.length) {
        currentStep = 0;
        setTimeout(animateProgress, 2000); // Pause before restart
      } else {
        setTimeout(animateProgress, 2500);
      }
    };

    setTimeout(animateProgress, 3000); // Start after initial animation
  }

  // Gallery interactions
  initGalleryInteractions() {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "scale(1.05) rotateY(5deg)";
        item.style.zIndex = "10";

        // Add ripple effect
        this.createRipple(item);
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "scale(1) rotateY(0deg)";
        item.style.zIndex = "1";
      });

      // Add click effect
      item.addEventListener("click", () => {
        this.showImagePreview(item, index);
      });
    });
  }

  createRipple(element) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

    element.style.position = "relative";
    element.appendChild(ripple);

    // Add ripple animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  showImagePreview(item, index) {
    // Create modal overlay
    const modal = document.createElement("div");
    modal.className = "image-preview-modal";
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    const preview = document.createElement("div");
    preview.style.cssText = `
            width: 80%;
            max-width: 600px;
            height: 400px;
            background: ${getComputedStyle(item).background};
            border-radius: 12px;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

    modal.appendChild(preview);
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
      modal.style.opacity = "1";
      preview.style.transform = "scale(1)";
    }, 10);

    // Close on click
    modal.addEventListener("click", () => {
      modal.style.opacity = "0";
      preview.style.transform = "scale(0.8)";
      setTimeout(() => modal.remove(), 300);
    });
  }

  // Edit indicators
  initEditIndicators() {
    const indicators = document.querySelectorAll(".edit-indicator");

    indicators.forEach((indicator) => {
      indicator.addEventListener("mouseenter", () => {
        const tooltip = indicator.querySelector(".indicator-tooltip");
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateX(-50%) translateY(0) scale(1.05)";
      });

      indicator.addEventListener("mouseleave", () => {
        const tooltip = indicator.querySelector(".indicator-tooltip");
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateX(-50%) translateY(-10px) scale(1)";
      });
    });

    // Animate indicators periodically
    setInterval(() => {
      indicators.forEach((indicator, index) => {
        setTimeout(() => {
          indicator.style.animation = "none";
          indicator.offsetHeight; // Trigger reflow
          indicator.style.animation = "indicatorPulse 2s ease-in-out infinite";
        }, index * 500);
      });
    }, 8000);
  }

  // Chat simulation
  initChatSimulation() {
    const messagesContainer = document.querySelector(".chat-messages");
    const typingMessage = document.querySelector(".typing-message");

    // Simulate typing completion
    setTimeout(() => {
      if (typingMessage) {
        const typingIndicator =
          typingMessage.querySelector(".typing-indicator");
        const progressBar = typingMessage.querySelector(".ai-progress");

        if (typingIndicator) {
          typingIndicator.style.display = "none";
        }

        if (progressBar) {
          progressBar.style.display = "none";
        }

        // Add completion message
        const completionMessage = document.createElement("div");
        completionMessage.className = "message ai-message";
        completionMessage.innerHTML = `
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>✨ Your stunning photography portfolio is ready! I've created a modern dark theme with elegant galleries and smooth animations.</p>
                        <div class="message-time">Just now</div>
                    </div>
                `;

        messagesContainer.appendChild(completionMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 5000);
  }

  // Particle system
  initParticleSystem() {
    const particles = document.querySelectorAll(".particle");

    // Randomize particle positions and speeds
    particles.forEach((particle, index) => {
      const randomDelay = Math.random() * 20;
      const randomSize = 2 + Math.random() * 4;
      const randomOpacity = 0.3 + Math.random() * 0.5;

      particle.style.animationDelay = `${randomDelay}s`;
      particle.style.width = `${randomSize}px`;
      particle.style.height = `${randomSize}px`;
      particle.style.opacity = randomOpacity;

      // Random colors
      const colors = ["#00d4ff", "#a855f7", "#ff6b6b", "#4ecdc4", "#fbbf24"];
      particle.style.background =
        colors[Math.floor(Math.random() * colors.length)];
    });
  }
}

// Utility functions
function createGlowEffect(element, color = "#00d4ff") {
  element.style.boxShadow = `0 0 20px ${color}40, 0 0 40px ${color}20`;
}

function removeGlowEffect(element) {
  element.style.boxShadow = "";
}

// Initialize demo when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new CanvasAIDemo();

  // Add smooth scrolling
  document.documentElement.style.scrollBehavior = "smooth";

  // Add performance optimization
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    });

    document
      .querySelectorAll(".gallery-item, .message, .capability-item")
      .forEach((el) => {
        observer.observe(el);
      });
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  const mockup = document.querySelector(".website-mockup");
  const activeDevice = document.querySelector(".device-btn.active");

  if (mockup && activeDevice) {
    const demo = new CanvasAIDemo();
    demo.applyDeviceTransform(mockup, null, activeDevice.dataset.device);
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger entrance animations
  const animateElements = document.querySelectorAll(
    ".demo-header, .demo-interface"
  );
  animateElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 200);
  });
});
