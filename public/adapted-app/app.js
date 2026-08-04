// AdaptEd App Mockup Logic
// User profile: My Trần / Bà Lan
// Email: tranvuuyenmy0305@gmail.com

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // GLOBAL PROTOTYPE STATE
  // ==========================================
  const state = {
    user: {
      name: "My Trần",
      email: "tranvuuyenmy0305@gmail.com",
      goal: "IELTS Preparation",
      style: "Visual Learner",
      level: "B2",
      streak: 14,
      xp: 2840
    },
    isSeniorMode: false, // Youth vs Senior Mode
    isDarkMode: false, // Default: Light mode for portfolio
    activeEmulatorScreen: "splash",
    lessonsCompleted: {
      vocab: true,
      listen: true,
      speak: false,
      gram: false
    },
    audioPlaying: false,
    audioInterval: null,
    audioTime: 0
  };

  // ==========================================
  // ADAPTIVE QUIZ QUESTIONS
  // ==========================================
  const quizQuestions = [
    {
      question: "If we had known, we _____ modified the deck.",
      options: [
        { letter: "A", text: "would have modified", correct: true },
        { letter: "B", text: "will modify", correct: false }
      ]
    }
  ];

  // ==========================================
  // RENDER GRID SHOWCASE AND INITIALIZE TEMPLATES
  // ==========================================
  const templatesContainer = document.getElementById('screen-templates');

  function getStatusBarHtml() {
    return `<div class="status-bar"><span class="clock">09:41</span><div class="status-icons"><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M2 22h20V2z"/></svg><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 21l-12-18h24z"/></svg><svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3h2v-4h-2V7a2 2 0 0 0-2-2z"/></svg></div></div>`;
  }

  // Populate Grid Showcase
  document.querySelectorAll('.screens-grid .phone-wrap').forEach(wrap => {
    const screenName = wrap.getAttribute('data-screen');
    const template = templatesContainer.querySelector(`.screen.${screenName}`);
    if (template) {
      const phoneContainer = wrap.querySelector('.phone');
      phoneContainer.innerHTML = ''; // Clear skeleton
      phoneContainer.appendChild(template.cloneNode(true));
      
      // Make active in Grid View so it always displays
      const screenEl = phoneContainer.querySelector('.screen');
      screenEl.classList.add('active');
      
      // Prepend Status Bar
      phoneContainer.insertAdjacentHTML('afterbegin', getStatusBarHtml());
    }
  });

  // ==========================================
  // ROUTER FOR EMULATOR
  // ==========================================
  const emulatorPhone = document.getElementById('emulatorPhone');
  const emulatorScreenContent = document.getElementById('emulatorScreenContent');
  const emulatorBottomNav = document.getElementById('emulatorBottomNav');

  function showEmulatorScreen(screenId) {
    state.activeEmulatorScreen = screenId;
    
    // 1. Find template
    const template = templatesContainer.querySelector(`.screen.${screenId}`);
    if (!template) return;

    // 2. Clone template and inject
    emulatorScreenContent.innerHTML = '';
    const clonedScreen = template.cloneNode(true);
    clonedScreen.id = `screen-${screenId}`;
    clonedScreen.classList.add('active');
    
    // Clear pre-baked answered states for live emulator interactions
    if (screenId === 'placement') {
      clonedScreen.querySelectorAll('.pt-option').forEach(o => {
        o.classList.remove('correct', 'wrong', 'selected');
        const check = o.querySelector('.opt-check');
        if (check) check.remove();
      });
    }
    if (screenId === 'quiz') {
      clonedScreen.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.remove('correct', 'wrong', 'selected');
        const check = o.querySelector('span:not(.q-opt-text)');
        if (check) check.remove();
      });
      const feedbackCard = clonedScreen.querySelector('.feedback-card');
      if (feedbackCard) feedbackCard.style.display = 'none';
    }

    emulatorScreenContent.appendChild(clonedScreen);

    // 3. Update Sidebar Navigator Buttons active state
    document.querySelectorAll('#emulatorScreenSelector .screen-btn').forEach(btn => {
      if (btn.getAttribute('data-target') === screenId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 4. Control Bottom Navigation and Tab States
    const hideBottomNavList = [
      'splash', 'welcome', 'login', 'onboarding-goals', 
      'onboarding-style', 'placement', 'experience-toggle'
    ];

    if (hideBottomNavList.includes(screenId)) {
      emulatorBottomNav.style.display = 'none';
    } else {
      emulatorBottomNav.style.display = 'flex';
      
      // Set Active Bottom Nav Tab
      let mappedTab = screenId;
      if (screenId.startsWith('dashboard')) mappedTab = 'dashboard';
      if (screenId === 'lesson' || screenId === 'quiz') mappedTab = 'curriculum';
      if (screenId === 'analytics' || screenId === 'recommendations') mappedTab = 'dashboard';

      document.querySelectorAll('#emulatorBottomNav .nav-item').forEach(item => {
        if (item.getAttribute('data-tab') === mappedTab) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // 5. Special screen init animations / loaders
    if (screenId === 'splash') {
      startEmulatorSplash();
    }

    // Sync input values and tags to UI
    syncStateToUI();
  }

  // Connect Emulator Sidebar click
  document.querySelectorAll('#emulatorScreenSelector .screen-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      showEmulatorScreen(target);
    });
  });

  // Connect Emulator Bottom Tabs click
  document.querySelectorAll('#emulatorBottomNav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      if (tab === 'dashboard') {
        showEmulatorScreen(state.isSeniorMode ? 'dashboard-senior' : 'dashboard-youth');
      } else {
        showEmulatorScreen(tab);
      }
    });
  });

  // Splash progress loader simulation
  function startEmulatorSplash() {
    const splashScreen = document.getElementById('screen-splash');
    if (!splashScreen) return;
    const bar = splashScreen.querySelector('.loading-bar');
    if (bar) {
      bar.style.width = '0%';
      setTimeout(() => bar.style.width = '100%', 100);
    }
    setTimeout(() => {
      if (state.activeEmulatorScreen === 'splash') showEmulatorScreen('welcome');
    }, 2200);
  }

  // Helper shortcut router function
  function goToScreen(screenId) {
    showEmulatorScreen(screenId);
  }

  // ==========================================
  // SYNC STATE TO ALL MOCKUPS (REAL-TIME CALCULATIONS)
  // ==========================================
  function syncStateToUI() {
    // 1. Calculations
    const vocabScore = 50 + (state.lessonsCompleted.vocab ? 20 : 0) + (state.lessonsCompleted.speak ? 12 : 0);
    const gramScore = 60 + (state.lessonsCompleted.gram ? 15 : 0);
    const speakScore = 40 + (state.lessonsCompleted.speak ? 21 : 0);
    const listenScore = 38 + (state.lessonsCompleted.listen ? 10 : 0);
    const overallScore = Math.round((vocabScore + gramScore + speakScore + listenScore) / 4);

    // 2. Sync credentials & profile text
    document.querySelectorAll('.sync-name').forEach(el => el.innerText = state.isSeniorMode ? "Bà Lan" : state.user.name);
    document.querySelectorAll('.sync-profile-name').forEach(el => el.innerText = state.isSeniorMode ? "Bà Lan" : state.user.name);
    document.querySelectorAll('.sync-email').forEach(el => {
      if (el.tagName === 'INPUT') el.value = state.isSeniorMode ? "" : state.user.email;
      else el.innerText = state.isSeniorMode ? "" : state.user.email;
    });
    document.querySelectorAll('.sync-profile-email').forEach(el => el.innerText = state.isSeniorMode ? "" : state.user.email);
    document.querySelectorAll('.sync-profile-goal').forEach(el => el.innerText = state.isSeniorMode ? "Daily Conversation" : state.user.goal);
    document.querySelectorAll('.sync-profile-level').forEach(el => el.innerText = state.isSeniorMode ? "B1 Level" : `${state.user.level} Level`);

    // 3. Sync streak and level badge
    document.querySelectorAll('.sync-level-badge').forEach(el => el.innerText = state.isSeniorMode ? "B1" : state.user.level);
    document.querySelectorAll('.sync-streak-val').forEach(el => el.innerText = state.isSeniorMode ? "7" : state.user.streak);
    document.querySelectorAll('.sync-xp-val').forEach(el => el.innerText = state.isSeniorMode ? "1,200" : state.user.xp.toLocaleString());

    // 4. Sync skill percentages
    document.querySelectorAll('.sync-vocab-pct').forEach(el => el.innerText = `${vocabScore}%`);
    document.querySelectorAll('.sync-gram-pct').forEach(el => el.innerText = `${gramScore}%`);
    document.querySelectorAll('.sync-listen-pct').forEach(el => el.innerText = `${listenScore}%`);
    document.querySelectorAll('.sync-speak-pct').forEach(el => el.innerText = `${speakScore}%`);

    // 5. Update overall progress text and SVG polygon points in radar charts
    const overallGram = Math.round(gramScore * 0.5 + 20);
    const overallVoc = Math.round(vocabScore * 0.5 + 20);
    const overallLis = Math.round(listenScore * 0.5 + 20);
    const overallSpk = Math.round(speakScore * 0.5 + 20);
    
    document.querySelectorAll('.sync-radar-poly').forEach(poly => {
      // Formats points dynamically based on scores: Gram(50, Y), Voc(X, Y), Lis(X, Y), Spk(X, Y)
      const points = `50,${10 + (100 - gramScore) * 0.35} ${88 - (100 - vocabScore) * 0.35},${38 + (100 - vocabScore) * 0.05} ${73 - (100 - listenScore) * 0.2},${82 - (100 - listenScore) * 0.2} ${27 + (100 - speakScore) * 0.2},${82 - (100 - speakScore) * 0.2} ${12 + (100 - speakScore) * 0.35},${38 + (100 - speakScore) * 0.05}`;
      poly.setAttribute('points', points);
    });

    // 6. Sync XP Display
    document.querySelectorAll('.sync-xp-display').forEach(el => el.innerText = state.isSeniorMode ? "1,200 XP" : `${state.user.xp} XP`);
    document.querySelectorAll('.sync-xp-to-go').forEach(el => el.innerText = state.isSeniorMode ? "800 XP" : `${3500 - state.user.xp} XP`);
    document.querySelectorAll('.sync-xp-bar').forEach(el => {
      const xpVal = state.isSeniorMode ? 1200 : state.user.xp;
      const targetXp = state.isSeniorMode ? 2000 : 3500;
      const pct = Math.min((xpVal / targetXp) * 100, 100);
      el.style.width = `${pct}%`;
    });

    // 7. Sync settings toggles
    const seniorToggle = document.getElementById('profileSeniorToggle');
    if (seniorToggle) {
      if (state.isSeniorMode) seniorToggle.classList.add('active');
      else seniorToggle.classList.remove('active');
    }

    const darkToggle = document.getElementById('profileDarkToggle');
    if (darkToggle) {
      if (state.isDarkMode) darkToggle.classList.add('active');
      else darkToggle.classList.remove('active');
    }
  }

  function addXP(amount) {
    state.user.xp += amount;
    showToast("⚡", `+${amount} XP Earned!`);
    syncStateToUI();
  }

  function toggleSeniorModeStyles() {
    const phones = document.querySelectorAll('.phone');
    if (state.isSeniorMode) {
      phones.forEach(ph => ph.classList.add('senior-mode'));
      document.getElementById('navItemPractice').style.display = 'none'; // Hide practice tab in senior mode
    } else {
      phones.forEach(ph => ph.classList.remove('senior-mode'));
      document.getElementById('navItemPractice').style.display = 'flex'; // Show practice tab
    }
    syncStateToUI();
  }

  // ==========================================
  // INTERACTION EVENT DELEGATION
  // ==========================================
  document.body.addEventListener('click', (e) => {
    
    // 1. Get Started button -> Onboarding Goals
    if (e.target.closest('.btn-get-started')) {
      goToScreen('onboarding-goals');
    }

    // 2. Sign In links
    if (e.target.closest('.btn-signin-link') || e.target.closest('.btn-signup-link')) {
      goToScreen('login');
    }

    // 3. Auth back button
    if (e.target.closest('.btn-back')) {
      goToScreen('welcome');
    }

    // 4. Sign In Submit -> Go to goals
    if (e.target.closest('.btn-signin-submit')) {
      state.user.name = "My Trần";
      state.user.email = "tranvuuyenmy0305@gmail.com";
      syncStateToUI();
      showModal("🎉", "Logged In Successfully", "Welcome back! User details loaded to showcase layout.", () => {
        goToScreen('onboarding-goals');
      });
    }

    // 5. Onboarding Goals Card selection
    const goalCard = e.target.closest('.goals-screen .ob-card');
    if (goalCard) {
      const container = goalCard.closest('.ob-body');
      container.querySelectorAll('.ob-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.ob-check').classList.remove('checked');
        c.querySelector('.ob-check').innerText = '';
      });
      goalCard.classList.add('selected');
      goalCard.querySelector('.ob-check').classList.add('checked');
      goalCard.querySelector('.ob-check').innerText = '✔';
      
      const val = goalCard.getAttribute('data-val');
      state.user.goal = goalCard.querySelector('.ob-card-title').innerText;
      syncStateToUI();
    }

    // 6. Goals Next -> Learning Style
    if (e.target.closest('.btn-ob-goals-next')) {
      goToScreen('onboarding-style');
    }

    // 7. Onboarding Style Card selection
    const styleCard = e.target.closest('.style-screen .style-card');
    if (styleCard) {
      const container = styleCard.closest('.style-grid');
      container.querySelectorAll('.style-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.style-check').innerText = '';
      });
      styleCard.classList.add('selected');
      styleCard.querySelector('.style-check').innerText = '✔';
      
      state.user.style = styleCard.querySelector('.style-title').innerText + " Learner";
      syncStateToUI();
    }

    // 8. Style Next -> Placement Test
    if (e.target.closest('.btn-ob-style-next')) {
      goToScreen('placement');
    }

    // 9. Placement Test Option Click
    const ptOpt = e.target.closest('.placement .pt-option');
    if (ptOpt) {
      const options = ptOpt.closest('.pt-options');
      options.querySelectorAll('.pt-option').forEach(o => {
        o.classList.remove('correct', 'wrong');
        const check = o.querySelector('.opt-check');
        if (check) check.remove();
      });
      
      if (ptOpt.getAttribute('data-ans') === 'A') {
        ptOpt.classList.add('correct');
        const check = document.createElement('span');
        check.className = 'opt-check';
        check.innerText = '✔';
        ptOpt.appendChild(check);
        addXP(50);
        
        setTimeout(() => {
          showModal("🎯", "Placement Finished!", "Congratulations, you solved the placement assessment! Starting proficiency unlocked: Level B2.", () => {
            goToScreen('experience-toggle');
          });
        }, 1000);
      } else {
        ptOpt.classList.add('wrong');
      }
    }

    // 10. Placement Test Continue -> Experience Toggle
    if (e.target.closest('.btn-pt-continue')) {
      goToScreen('experience-toggle');
    }

    // 11. Choose Experience selection
    const expCard = e.target.closest('.experience-toggle-screen .experience-card');
    if (expCard) {
      const container = expCard.closest('.ob-body');
      container.querySelectorAll('.experience-card').forEach(c => {
        c.classList.remove('selected');
        c.querySelector('.btn-exp-select').innerText = c.classList.contains('youth-mode') ? 'Select Youth Mode' : 'Select Senior Mode';
      });
      expCard.classList.add('selected');
      const isSenior = expCard.getAttribute('data-mode') === 'senior';
      expCard.querySelector('.btn-exp-select').innerText = isSenior ? '✔ Select Senior Mode' : '✔ Select Youth Mode';
      
      state.isSeniorMode = isSenior;
      toggleSeniorModeStyles();
      
      setTimeout(() => {
        showModal("✨", "Experience Selected", `Welcome! Giao diện đã được thiết lập theo chế độ ${isSenior ? "Senior Mode" : "Youth Mode"}.`, () => {
          goToScreen(isSenior ? 'dashboard-senior' : 'dashboard-youth');
        });
      }, 1000);
    }

    // 12. Dashboard Recommended Lesson -> Go to Curriculum
    if (e.target.closest('.btn-rec-lesson-trigger') || e.target.closest('.btn-senior-start-lesson')) {
      goToScreen('curriculum');
    }

    // 13. Curriculum Node click -> Go to Lesson / Quiz / Tutor
    if (e.target.closest('.curr-body .lesson-node')) {
      const node = e.target.closest('.curr-body .lesson-node');
      if (node.classList.contains('active')) {
        goToScreen('lesson');
      }
    }

    // 14. Lesson page incomplete audio wave play button click
    if (e.target.closest('.lesson-screen .btn-g-play') || e.target.closest('.placement-top .btn-g-play')) {
      triggerWaveformPlay();
    }

    // 15. Lesson Complete button click
    if (e.target.closest('.btn-lesson-complete-action')) {
      state.lessonsCompleted.listen = true;
      addXP(80);
      showModal("🏆", "Lesson Mastered!", "Great job! Advanced listening skill levels recalculated.", () => {
        goToScreen('curriculum');
      });
    }

    // 16. Quiz Option Click
    const quizOpt = e.target.closest('.quiz-screen .quiz-option');
    if (quizOpt) {
      const options = quizOpt.closest('.quiz-options');
      
      // Remove previous status checkmarks
      options.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.remove('correct', 'wrong');
        const check = o.querySelector('span:not(.q-opt-text)');
        if (check) check.remove();
      });
      
      const isCorrect = quizOpt.getAttribute('data-correct') === 'true';
      const feedbackCard = quizOpt.closest('.quiz-screen').querySelector('.feedback-card');
      
      if (isCorrect) {
        quizOpt.classList.add('correct');
        quizOpt.insertAdjacentHTML('beforeend', `<span style="color:var(--green); font-weight:bold; margin-left: auto;">✓</span>`);
        
        if (feedbackCard) {
          feedbackCard.style.display = 'block';
          feedbackCard.querySelector('.fb-header .fb-icon').innerText = '✅';
          feedbackCard.querySelector('.fb-header .fb-title').innerText = 'Correct! Great work.';
        }
        
        state.lessonsCompleted.gram = true;
        addXP(60);
        
        setTimeout(() => {
          showModal("🎉", "Quiz Finished!", "Grammar competency metrics calculated and updated.", () => {
            goToScreen('analytics');
          });
        }, 1800);
      } else {
        quizOpt.classList.add('wrong');
        quizOpt.insertAdjacentHTML('beforeend', `<span style="color:var(--red); font-weight:bold; margin-left: auto;">✗</span>`);
        
        if (feedbackCard) {
          feedbackCard.style.display = 'block';
          feedbackCard.querySelector('.fb-header .fb-icon').innerText = '❌';
          feedbackCard.querySelector('.fb-header .fb-title').innerText = 'Incorrect. Try again!';
        }
      }
    }

    // 17. Quiz Next Button -> Go to Analytics
    if (e.target.closest('.btn-quiz-next')) {
      goToScreen('analytics');
    }

    // 18. Smart recommendations lists click -> Go to lesson
    if (e.target.closest('.recommendations-screen .btn-lesson-trigger')) {
      goToScreen('lesson');
    }

    // 19. Smart recommendations refresh
    if (e.target.closest('.btn-refresh-recommendations')) {
      showToast("🔄", "WASPEC-adaptive engine recalibrating...");
    }

    // 20. Tutor page explanation chip click
    if (e.target.closest('.tutor .btn-sugg-explain')) {
      sendTutorBubble("Explain grammar rule");
    }

    // 21. Tutor page practice chip click
    if (e.target.closest('.tutor .btn-sugg-practice')) {
      sendTutorBubble("Let me practice");
    }

    // 22. Tutor send input text message button click
    if (e.target.closest('.btn-tutor-send')) {
      const input = document.getElementById('tutorInputBox');
      if (input && input.value.trim()) {
        sendTutorBubble(input.value);
        input.value = '';
      }
    }

    // 23. Profile Senior Mode Toggle click
    if (e.target.closest('#profileSeniorToggle')) {
      state.isSeniorMode = !state.isSeniorMode;
      toggleSeniorModeStyles();
      goToScreen(state.isSeniorMode ? 'dashboard-senior' : 'dashboard-youth');
    }

    // 24. Profile Dark Mode Toggle click
    if (e.target.closest('#profileDarkToggle')) {
      toggleGlobalTheme();
    }

    // 25. General dialog link jumps in the Showcase view mode
    if (e.target.closest('.btn-analytics-trigger')) {
      goToScreen('analytics');
    }
    if (e.target.closest('.btn-recommendations-trigger')) {
      goToScreen('recommendations');
    }
    if (e.target.closest('.btn-tutor-trigger')) {
      goToScreen('tutor');
    }
    if (e.target.closest('.btn-curr-tab-trigger')) {
      goToScreen('curriculum');
    }

  });

  // AI Voice Tutor Chat Bubbles Simulation
  function sendTutorBubble(messageText) {
    const chatLog = document.getElementById('tutorChatLog');
    if (!chatLog) return;

    // 1. Append User Bubble
    const userMsg = document.createElement('div');
    userMsg.className = "chat-msg user";
    userMsg.innerHTML = `<div class="chat-bubble">${messageText}</div><div class="chat-time">2:16 PM</div>`;
    chatLog.appendChild(userMsg);
    chatLog.scrollTop = chatLog.scrollHeight;

    // 2. Append Bot Response
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = "chat-msg bot";
      
      let botResponse = "Got it! Adaptive AI learning model syncing details...";
      if (messageText.toLowerCase().includes("explain")) {
        botResponse = "Certainly! Use FOR with a duration (e.g., 'for 3 hours'), and use SINCE with a specific starting point (e.g., 'since 9 AM'). Let's practice with an exercise!";
      } else if (messageText.toLowerCase().includes("practice")) {
        botResponse = "Awesome! Complete this sentence: 'I have been studying English _____ last year.' (A) for (B) since. Type your answer!";
      }

      botMsg.innerHTML = `<div class="chat-bubble">${botResponse}</div><div class="chat-time">2:16 PM</div>`;
      chatLog.appendChild(botMsg);
      chatLog.scrollTop = chatLog.scrollHeight;
      
      state.lessonsCompleted.speak = true;
      addXP(10);
    }, 1200);
  }

  // Waveform animation helper
  function triggerWaveformPlay() {
    const waveContainer = document.getElementById('lessonWaveform');
    if (!waveContainer) return;
    const bars = waveContainer.querySelectorAll('.wave-bar');
    const playBtn = document.querySelector('.lesson-screen .btn-g-play svg');

    if (state.audioPlaying) {
      clearInterval(state.audioInterval);
      state.audioPlaying = false;
      if (playBtn) playBtn.innerHTML = `<path d="M8 5v14l11-7z"/>`;
      bars.forEach(b => b.style.height = '10px');
    } else {
      state.audioPlaying = true;
      if (playBtn) playBtn.innerHTML = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;
      state.audioInterval = setInterval(() => {
        bars.forEach(b => {
          b.style.height = `${Math.floor(Math.random() * 26) + 4}px`;
        });
      }, 120);
    }
  }

  // ==========================================
  // VIEW MODE NAVIGATION (TABS)
  // ==========================================
  const viewGrid = document.getElementById('view-grid');
  const viewEmulator = document.getElementById('view-emulator');
  const btnToggleGrid = document.getElementById('btnToggleGrid');
  const btnToggleEmulator = document.getElementById('btnToggleEmulator');

  btnToggleGrid.addEventListener('click', () => {
    btnToggleGrid.classList.add('active');
    btnToggleEmulator.classList.remove('active');
    viewGrid.classList.add('active');
    viewEmulator.classList.remove('active');
  });

  btnToggleEmulator.addEventListener('click', () => {
    btnToggleEmulator.classList.add('active');
    btnToggleGrid.classList.remove('active');
    viewEmulator.classList.add('active');
    viewGrid.classList.remove('active');
    
    // Reset view
    goToScreen(state.activeEmulatorScreen);
  });

  // ==========================================
  // THEME SWITCHER (DARK MODE vs LIGHT MODE)
  // ==========================================
  const btnGlobalThemeToggle = document.getElementById('btnGlobalThemeToggle');
  const themeToggleText = document.getElementById('themeToggleText');

  function toggleGlobalTheme() {
    state.isDarkMode = !state.isDarkMode;
    
    if (state.isDarkMode) {
      document.body.classList.remove('light-theme');
      document.querySelectorAll('.phone').forEach(ph => ph.classList.add('dark-theme'));
      if (themeToggleText) themeToggleText.innerText = "Light Mode";
    } else {
      document.body.classList.add('light-theme');
      document.querySelectorAll('.phone').forEach(ph => ph.classList.remove('dark-theme'));
      if (themeToggleText) themeToggleText.innerText = "Dark Mode";
    }

    showToast("🌓", `Switched to ${state.isDarkMode ? 'Dark' : 'Light'} Theme`);
    syncStateToUI();
  }

  if (btnGlobalThemeToggle) btnGlobalThemeToggle.addEventListener('click', toggleGlobalTheme);

  // ==========================================
  // PRESENTATION MODE (HIDE HELPERS)
  // ==========================================
  const btnPresentationToggle = document.getElementById('btnPresentationToggle');
  const presToggleText = document.getElementById('presToggleText');
  let isPresentationMode = false;

  if (btnPresentationToggle) {
    btnPresentationToggle.addEventListener('click', () => {
      isPresentationMode = !isPresentationMode;
      if (isPresentationMode) {
        document.body.classList.add('presentation-mode');
        if (presToggleText) presToggleText.innerText = "Show Helpers";
        showToast("👁️", "Presentation Mode: Helpers hidden");
      } else {
        document.body.classList.remove('presentation-mode');
        if (presToggleText) presToggleText.innerText = "Hide Helpers";
        showToast("👁️", "Standard Mode: Helpers visible");
      }
    });
  }

  // ==========================================
  // OVERLAY TOASTS & MODALS
  // ==========================================
  let modalCallback = null;

  function showModal(icon, title, desc, callback = null) {
    const modal = document.getElementById('alertModal');
    if (!modal) return;
    modal.querySelector('.modal-icon').innerText = icon;
    modal.querySelector('.modal-title').innerText = title;
    modal.querySelector('.modal-desc').innerText = desc;
    modal.classList.add('active');
    modalCallback = callback;
  }

  const btnModalClose = document.getElementById('btnModalClose');
  if (btnModalClose) {
    btnModalClose.addEventListener('click', () => {
      document.getElementById('alertModal').classList.remove('active');
      if (modalCallback) {
        modalCallback();
        modalCallback = null;
      }
    });
  }

  function showToast(icon, text) {
    const toast = document.createElement('div');
    toast.className = 'toast-bubble-alert';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.background = 'rgba(15, 10, 46, 0.9)';
    toast.style.border = '1.5px solid rgba(255,255,255,0.15)';
    toast.style.borderRadius = '12px';
    toast.style.padding = '12px 18px';
    toast.style.color = '#fff';
    toast.style.fontSize = '12px';
    toast.style.fontFamily = 'var(--font-main)';
    toast.style.fontWeight = '600';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';

    toast.innerHTML = `<span>${icon}</span><span>${text}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==========================================
  // INITIALIZE APP STATE
  // ==========================================
  goToScreen('splash');
  toggleGlobalTheme(); // Start with Light Mode as global layout (Figma mockup is dark-themed phones on a dark background)
  
});
