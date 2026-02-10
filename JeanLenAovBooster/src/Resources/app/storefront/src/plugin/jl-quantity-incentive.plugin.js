import Plugin from 'src/plugin-system/plugin.class';

/**
 * Zeigt einen Spar-Hinweis, wenn der Kunde die Menge erhöht.
 * Berechnet die Ersparnis dynamisch basierend auf dem Rabattprozentsatz.
 */
export default class JlQuantityIncentivePlugin extends Plugin {
    static options = {
        unitPrice: 0,
        discountPercent: 10,
        minQuantity: 2,
        quantityInputSelector: '.product-detail-quantity-input',
        quantityTargetSelector: '[data-quantity-target]',
        savingsTargetSelector: '[data-savings-target]',
    };

    init() {
        this.quantityInput = document.querySelector(this.options.quantityInputSelector);
        this.quantityTarget = this.el.querySelector(this.options.quantityTargetSelector);
        this.savingsTarget = this.el.querySelector(this.options.savingsTargetSelector);

        if (!this.quantityInput) return;

        this._updateDisplay();
        this.quantityInput.addEventListener('change', this._onQuantityChange.bind(this));

        // Auch die +/- Buttons abfangen
        const wrapper = this.quantityInput.closest('.quantity-selector, .product-detail-quantity');
        if (wrapper) {
            wrapper.addEventListener('click', () => {
                setTimeout(() => this._onQuantityChange(), 50);
            });
        }
    }

    _onQuantityChange() {
        this._updateDisplay();
    }

    _updateDisplay() {
        const quantity = parseInt(this.quantityInput.value, 10) || 1;
        const unitPrice = parseFloat(this.options.unitPrice);
        const discountPercent = parseFloat(this.options.discountPercent);
        const minQuantity = parseInt(this.options.minQuantity, 10);

        if (quantity >= minQuantity) {
            const savings = (unitPrice * quantity * discountPercent) / 100;
            this.quantityTarget.textContent = quantity;
            this.savingsTarget.textContent = new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
            }).format(savings);
            this.el.style.display = '';
        } else {
            this.el.style.display = 'none';
        }
    }
}
