describe("Payments tests (with setup and tear-down):", () => {
    beforeEach(() => {
        // initialization logic
        billAmtInput.value = 1000;
        tipAmtInput.value = 200;
    });

    it('should add new payment to allPayments on submitPaymentInfo()', () => {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('1000');
        expect(allPayments['payment1'].tipAmt).toEqual('200');
        expect(allPayments['payment1'].tipPercent).toEqual(20);
    });

    it('should not add new payment to allPayments on submitPaymentInfo() with empty bill amount', () => {
        billAmtInput.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    })

    it('should new payment on createCurPayment()', () => {
        let newPayment = {
            billAmt: '1000',
            tipAmt: '200',
            tipPercent: 20
        };
        expect(createCurPayment()).toEqual(newPayment);
    });

    it('should not create new payment on createCurPayment() with empty bill amount', () => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should create tr and pass to appendTd with input value on appendPaymentTable()', () => {
        let currentPayment = createCurPayment();
        allPayments['payment1'] = currentPayment;
        appendPaymentTable(currentPayment);

        let currentTd = document.querySelectorAll('#paymentTable tbody tr td');

        expect(currentTd.length).toEqual(4);
        expect(currentTd[0].innerText).toEqual('$1000');
        expect(currentTd[1].innerText).toEqual('$200');
        expect(currentTd[2].innerText).toEqual('20%');
        expect(currentTd[3].innerText).toEqual('X');
    })

    afterEach(function () {
        // teardown logic
        allPayments = {};
        paymentId = 0;
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });
});