document.addEventListener('DOMContentLoaded', () => {
  // Sync views slider and input
  const viewsInput = document.getElementById('views-input');
  const viewsSlider = document.getElementById('views-slider');

  viewsSlider.addEventListener('input', (e) => {
    viewsInput.value = e.target.value;
  });

  viewsInput.addEventListener('input', (e) => {
    let val = parseInt(e.target.value);
    if (!isNaN(val)) {
      viewsSlider.value = val;
    }
  });

  // Smooth scroll for Start Calculating button
  document.getElementById('btn-start').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#calculator').scrollIntoView({ behavior: 'smooth' });
  });

  // Calculate logic
  document.getElementById('btn-calculate').addEventListener('click', () => {
    // 1. Gather inputs
    const platform = document.getElementById('platform').value;
    const views = parseInt(viewsInput.value) || 50000;
    const niche = document.getElementById('niche').value;
    
    let experience = 'intermediate';
    const expRadios = document.querySelectorAll('input[name="experience"]');
    expRadios.forEach(radio => {
      if (radio.checked) experience = radio.value;
    });

    const usageRights = {
      reuse: document.getElementById('usage-reuse').checked,
      exclusive: document.getElementById('usage-exclusive').checked
    };

    const videoLength = document.getElementById('video-length').value;

    // 2. Call calculation algorithm
    // calculateUGCRate is globally available from calculator.js
    if (typeof calculateUGCRate !== 'function') {
      console.error('Calculator function not found!');
      return;
    }
    
    const result = calculateUGCRate(platform, views, niche, experience, usageRights, videoLength);

    // 3. Format currency
    const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

    // 4. Update DOM
    document.getElementById('result-price').textContent = `${formatCurrency(result.min)} - ${formatCurrency(result.max)} per video`;
    
    // Formatting breakdown
    document.getElementById('result-breakdown').textContent = `Base: ${formatCurrency(result.breakdown.base)} + Usage: ${formatCurrency(result.breakdown.usage)} = ${formatCurrency(result.avg)} (avg)`;

    // Update table
    document.getElementById('res-platform').textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
    
    // Format views (e.g. 50,000 -> 50K)
    let formattedViews = views >= 1000000 ? (views / 1000000).toFixed(1) + 'M' : (views >= 1000 ? (views / 1000).toFixed(0) + 'K' : views);
    document.getElementById('res-views').textContent = formattedViews;
    
    document.getElementById('res-niche').textContent = niche.charAt(0).toUpperCase() + niche.slice(1);
    document.getElementById('res-level').textContent = experience.charAt(0).toUpperCase() + experience.slice(1);

    // 5. Show and scroll to result
    const resultSection = document.getElementById('result');
    resultSection.classList.add('active');
    setTimeout(() => {
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });
});
