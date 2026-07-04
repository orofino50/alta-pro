// Shopify Buy Button — Pistola a alta presion
// EasySell intercepta este checkout e abre o form COD automaticamente.
(function () {
  var SCRIPT_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  var CONFIG = {
    domain: 'yq8tqj-mw.myshopify.com',
    storefrontAccessToken: 'bbfbe489708458d11b582f72e0b78a5f',
    productId: '7985212129323',
    nodeId: 'product-component-1783202400178'
  };

  function loadScript(cb) {
    var s = document.createElement('script');
    s.async = true;
    s.src = SCRIPT_URL;
    s.onload = cb;
    (document.head || document.body).appendChild(s);
  }

  function initBuyButton() {
    if (!window.ShopifyBuy || !window.ShopifyBuy.buildClient) return;
    var client = ShopifyBuy.buildClient({
      domain: CONFIG.domain,
      storefrontAccessToken: CONFIG.storefrontAccessToken
    });
    window.__shopifyUIReady = ShopifyBuy.UI.onReady(client);
  }

  if (window.ShopifyBuy) {
    initBuyButton();
  } else {
    loadScript(initBuyButton);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Cria o node alvo (escondido) onde o Buy Button sera montado
    if (!document.getElementById(CONFIG.nodeId)) {
      var hidden = document.createElement('div');
      hidden.id = CONFIG.nodeId;
      hidden.style.position = 'absolute';
      hidden.style.left = '-9999px';
      hidden.style.top = '0';
      hidden.style.width = '1px';
      hidden.style.height = '1px';
      hidden.setAttribute('aria-hidden', 'true');
      document.body.appendChild(hidden);
    }

    var node = document.getElementById(CONFIG.nodeId);

    function openCheckout() {
      if (!window.__shopifyUIReady) return;
      window.__shopifyUIReady.then(function (ui) {
        ui.openCheckout(CONFIG.productId);
      });
    }

    // Expor funcao global para os botoes do site
    window.shopifyCheckoutPistola = openCheckout;

    // Auto-bind em qualquer link com data-shopify="pistola"
    document.querySelectorAll('[data-shopify="pistola"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openCheckout();
      });
    });
  });
})();
</content>
</invoke>