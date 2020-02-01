describe("Servers tests (with setup and tear-down):", () => {
  beforeEach(() => {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', () => {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add a new server to allServers on submitServerInfo() with empty input', () => {
    serverNameInput.value = '';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should update server table on updateServerTable()', () => {
    submitServerInfo();
    updateServerTable();
    let currentTd = document.querySelectorAll('#serverTable tbody tr td');
    expect(currentTd.length).toEqual(3);
    expect(currentTd[0].innerText).toEqual('Alice');
    expect(currentTd[1].innerText).toEqual('$0.00');
    expect(currentTd[2].innerText).toEqual('X');
  })

  afterEach(function () {
    // teardown logic
    serverId = 0;
    allServers = {};
    serverTbody.innerHTML = '';
  });
});