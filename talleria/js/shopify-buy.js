// Shopify Buy Button — Pistola a alta presion
// SDK oficial Shopify. Abre checkout transparente (COD nativo ativo na loja).
(function () {
  var SCRIPT_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  var CONFIG = {
    domain: 'yq8tqj-mw.myshopify.com',
    storefrontAccessToken: 'bbfbe489708458d11b582f72e0b78a5f',
    productId: '7985212129323',
    nodeId: 'product-component-1783214728378'
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
    // Cria node alvo escondido para o Buy Button SDK montar
    if (!document.getElementById(CONFIG.nodeId)) {
      var hidden = document.createElement('div');
      hidden.id = CONFIG.nodeId;
      hidden.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;';
      hidden.setAttribute('aria-hidden', 'true');
      document.body.appendChild(hidden);
    }

    function openCheckout() {
      if (!window.__shopifyUIReady) {
        alert('Carregando checkout... Tente novamente em instantes.');
        return;
      }
      window.__shopifyUIReady.then(function (ui) {
        ui.openCheckout(CONFIG.productId);
      });
    }

    // Expor funcao global
    window.shopifyCheckoutPistola = openCheckout;

    // Auto-bind em qualquer link/botao com data-shopify="pistola"
    document.querySelectorAll('[data-shopify="pistola"]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openCheckout();
      });
    });
  });
})();