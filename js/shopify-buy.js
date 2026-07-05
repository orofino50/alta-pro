// Shopify Buy Button — Pistola a alta presion
// Com fallback: se SDK falhar, abre pagina do produto Shopify direto.
(function () {
  'use strict';

  var SCRIPT_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  var CONFIG = {
    domain: 'yq8tqj-mw.myshopify.com',
    storefrontAccessToken: 'bbfbe489708458d11b582f72e0b78a5f',
    productId: '7985212129323',
    nodeId: 'product-component-1783214728378',
    productUrl: 'https://yq8tqj-mw.myshopify.com/products/pistola-a-alta-presion'
  };

  var sdkReady = false;
  var uiInstance = null;

  function log(msg) {
    if (window.console) console.log('[ShopifyBuy]', msg);
  }

  function loadScript(cb) {
    log('Loading SDK from ' + SCRIPT_URL);
    var s = document.createElement('script');
    s.async = true;
    s.src = SCRIPT_URL;
    s.onload = function () {
      log('SDK loaded');
      cb();
    };
    s.onerror = function () {
      log('ERROR: SDK failed to load');
      sdkReady = false;
    };
    (document.head || document.body).appendChild(s);
  }

  function initBuyButton() {
    if (!window.ShopifyBuy || !window.ShopifyBuy.buildClient) {
      log('ERROR: ShopifyBuy not available');
      return;
    }
    log('Initializing client for ' + CONFIG.domain);
    var client = ShopifyBuy.buildClient({
      domain: CONFIG.domain,
      storefrontAccessToken: CONFIG.storefrontAccessToken
    });

    ShopifyBuy.UI.onReady(client).then(function (ui) {
      log('UI ready, creating component for product ' + CONFIG.productId);
      uiInstance = ui;
      sdkReady = true;

      // Cria node alvo escondido para o Buy Button SDK montar
      if (!document.getElementById(CONFIG.nodeId)) {
        var hidden = document.createElement('div');
        hidden.id = CONFIG.nodeId;
        hidden.style.cssText = 'position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;';
        hidden.setAttribute('aria-hidden', 'true');
        document.body.appendChild(hidden);
      }

      ui.createComponent('product', {
        id: CONFIG.productId,
        node: document.getElementById(CONFIG.nodeId),
        moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
        options: {
          product: {
            buttonDestination: 'checkout',
            contents: { img: false, title: false, price: false },
            text: { button: 'Comprar ahora' }
          }
        }
      }).then(function () {
        log('Component created successfully');
      }).catch(function (err) {
        log('ERROR creating component: ' + err.message);
        sdkReady = false;
      });
    }).catch(function (err) {
      log('ERROR on UI ready: ' + err.message);
      sdkReady = false;
    });
  }

  function openCheckout() {
    log('openCheckout called, sdkReady=' + sdkReady);
    if (sdkReady && uiInstance) {
      log('Opening checkout via SDK');
      uiInstance.openCheckout(CONFIG.productId);
    } else {
      log('SDK not ready, falling back to direct product page');
      window.open(CONFIG.productUrl, '_blank', 'noopener,noreferrer');
    }
  }

  // Inicia carregamento
  if (window.ShopifyBuy) {
    initBuyButton();
  } else {
    loadScript(initBuyButton);
  }

  // Auto-bind quando DOM pronto
  document.addEventListener('DOMContentLoaded', function () {
    log('DOMContentLoaded, binding [data-shopify="pistola"] buttons');
    var buttons = document.querySelectorAll('[data-shopify="pistola"]');
    log('Found ' + buttons.length + ' button(s)');

    buttons.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        log('Button clicked');
        openCheckout();
      });
    });
  });

  // Expor globalmente
  window.shopifyCheckoutPistola = openCheckout;
})();