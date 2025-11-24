
    document.getElementById("year").textContent = new Date().getFullYear();
    const CART_KEY = "sportify-cart";
    const TAX_RATE = 0.07;
    const SHIPPING_FLAT = 5.99;

    const itemsEl = document.getElementById("items");
    const subtotalEl = document.getElementById("subtotal-val");
    const shippingEl = document.getElementById("shipping-val");
    const taxEl = document.getElementById("tax-val");
    const totalEl = document.getElementById("total-val");
    const statusEl = document.getElementById("cart-status");
    const confirmationEl = document.getElementById("confirmation");
    const orderNumberEl = document.getElementById("order-number");
    const orderSummaryEl = document.getElementById("order-summary");

    function loadCart() {
      try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
      catch (e) { return []; }
    }
    function saveCart(items) { localStorage.setItem(CART_KEY, JSON.stringify(items)); }
    function formatCurrency(n) { return "$" + n.toFixed(2); }

    function renderSummary() {
      const cart = loadCart();
      itemsEl.innerHTML = "";
      if (!cart.length) {
        itemsEl.innerHTML = '<div class="empty">Your cart is empty.</div>';
      } else {
        cart.forEach(item => {
          const row = document.createElement("div");
          row.className = "item-row";
          row.innerHTML = `<span>${item.name} (${item.size}) x ${item.qty}</span><span>${formatCurrency(item.price * item.qty)}</span>`;
          itemsEl.appendChild(row);
        });
      }

      const subtotal = cart.reduce((s,i) => s + i.price * i.qty, 0);
      const shipping = cart.length ? SHIPPING_FLAT : 0;
      const tax = cart.length ? +(subtotal * TAX_RATE).toFixed(2) : 0;
      const total = subtotal + shipping + tax;

      subtotalEl.textContent = formatCurrency(subtotal);
      shippingEl.textContent = formatCurrency(shipping);
      taxEl.textContent = formatCurrency(tax);
      totalEl.textContent = formatCurrency(total);

      return { cart, totals: { subtotal, shipping, tax, total } };
    }

    function toggleCardFields() {
      const show = document.querySelector('input[name="payment"]:checked').value === "card";
      document.getElementById("card-fields").style.display = show ? "block" : "none";
    }

    document.querySelectorAll('input[name="payment"]').forEach(r => r.addEventListener("change", toggleCardFields));
    toggleCardFields();

    const { cart: initialCart, totals: initialTotals } = renderSummary();
    if (!initialCart.length) {
      statusEl.textContent = "Your cart is empty. Add items before checking out.";
      document.getElementById("place-order").disabled = true;
    }

    function validateForm(cart) {
      if (!cart.length) return { ok:false, message:"Cart is empty." };
      const requiredIds = ["fullName","email","phone","address","city","zip"];
      for (const id of requiredIds) {
        const el = document.getElementById(id);
        if (!el.value.trim()) return { ok:false, message:"Please fill all required fields." };
      }
      const payment = document.querySelector('input[name="payment"]:checked').value;
      if (payment === "card") {
        const cardIds = ["cardName","cardNumber","exp","cvv"];
        for (const id of cardIds) {
          if (!document.getElementById(id).value.trim()) return { ok:false, message:"Please enter full card details." };
        }
      }
      return { ok:true };
    }

    function makeOrderNumber() {
      const part = Date.now().toString().slice(-6);
      const rand = Math.floor(Math.random()*900 + 100);
      return `SP-${part}-${rand}`;
    }

    function buildReceiptHtml(order) {
      const itemRows = order.cart.map(i => `<tr><td>${i.name} (${i.size}) x ${i.qty}</td><td style="text-align:right;">${formatCurrency(i.price * i.qty)}</td></tr>`).join("");
      return `<!doctype html><html><head><title>Receipt ${order.number}</title>
        <style>body{font-family:Arial;padding:24px;color:#111;} h1{margin:0 0 6px;} table{width:100%;border-collapse:collapse;margin-top:14px;} td{padding:6px 0;border-bottom:1px solid #ddd;} .totals td{font-weight:bold;}</style>
      </head><body>
        <h1>Sportify Receipt</h1>
        <div>Order: ${order.number}</div>
        <div>Date: ${new Date().toLocaleString()}</div>
        <div style="margin-top:10px;">Customer: ${order.name}</div>
        <div>Address: ${order.address}</div>
        <div>Email: ${order.email}</div>
        <div>Phone: ${order.phone}</div>
        <div>Payment: ${order.payment === "card" ? "Card" : "Pay on Delivery"}</div>
        <table>${itemRows}
          <tr class="totals"><td>Subtotal</td><td style="text-align:right;">${formatCurrency(order.totals.subtotal)}</td></tr>
          <tr class="totals"><td>Shipping</td><td style="text-align:right;">${formatCurrency(order.totals.shipping)}</td></tr>
          <tr class="totals"><td>Tax</td><td style="text-align:right;">${formatCurrency(order.totals.tax)}</td></tr>
          <tr class="totals"><td>Total</td><td style="text-align:right;">${formatCurrency(order.totals.total)}</td></tr>
        </table>
        <p style="margin-top:16px;">Thank you for shopping with Sportify!</p>
        <script>window.onload = () => { window.print(); }<\/script>
      </body></html>`;
    }

    document.getElementById("checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const { cart, totals } = renderSummary();
      const valid = validateForm(cart);
      if (!valid.ok) { alert(valid.message); return; }

      const payment = document.querySelector('input[name="payment"]:checked').value;
      const order = {
        number: makeOrderNumber(),
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        address: `${document.getElementById("address").value.trim()}, ${document.getElementById("city").value.trim()} ${document.getElementById("zip").value.trim()}`,
        notes: document.getElementById("notes").value.trim(),
        payment,
        cart,
        totals
      };

      orderNumberEl.textContent = `Order #: ${order.number}`;
      orderSummaryEl.textContent = `${cart.length} item${cart.length === 1 ? "" : "s"} - ${formatCurrency(totals.total)}. Delivery to ${order.address}.`;
      confirmationEl.style.display = "block";
      statusEl.textContent = "Payment received. Your order is confirmed.";

      // Clear cart after order placed
      saveCart([]);
      renderSummary();

      document.getElementById("download-receipt").onclick = () => {
        const html = buildReceiptHtml(order);
        const w = window.open("", "_blank");
        w.document.write(html);
        w.document.close();
      };
    });
  