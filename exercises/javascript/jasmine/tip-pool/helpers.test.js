describe("Helper tests (with setup and tear-down):", () => {
    beforeEach(() => {
        // initialization logic
        billAmtInput.value = 1000;
        tipAmtInput.value = 200;
        submitPaymentInfo();
    });

    it('should sum total tips from allPayments objects on sumPaymentTotal()', () => {
        expect(sumPaymentTotal('tipAmt')).toEqual(200);
        billAmtInput.value = 400;
        tipAmtInput.value = 40;
        submitPaymentInfo();
        expect(sumPaymentTotal('tipAmt')).toEqual(240);
    });

    it('should sum total bills from allPayments objects on sumPaymentTotal()', () => {
        expect(sumPaymentTotal('billAmt')).toEqual(1000);
        billAmtInput.value = 400;
        tipAmtInput.value = 40;
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(1400);
    });

    it('should sum total tip percentage from a tip on sumPaymentTotal()', () => {
        expect(calculateTipPercent(1000, 100)).toEqual(10);
        expect(calculateTipPercent(50, 50)).toEqual(100);
    });

    it('should append a new td element to tr on appendTd(tr, value)', () => {
        let newTr = document.createElement('tr');
        appendTd(newTr, 'testval');
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('testval');
    })

    it('should append a new delete td to tr on appendDeleteBtn(tr)', () => {
        let newTr = document.createElement('tr');
        appendDeleteBtn(newTr);
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerText).toEqual('X');
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