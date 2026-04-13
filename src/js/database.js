window.ArabelaDB = {
    // --- GOWN INVENTORY ---
    getGowns() {
        return JSON.parse(localStorage.getItem('arabela_gowns')) || [];
    },

    saveGowns(gowns) {
        localStorage.setItem('arabela_gowns', JSON.stringify(gowns));
    },

    // Updates a specific gown's status (Available, Reserved, Damaged, etc.)
    syncGownStatus(gownId, status) {
        const gowns = this.getGowns();
        const index = gowns.findIndex(g => g.id === gownId);
        if (index !== -1) {
            gowns[index].status = status;
            this.saveGowns(gowns);
        }
    },

    // --- RESERVATIONS ---
    getReservations() {
        return JSON.parse(localStorage.getItem('arabela_reservations')) || [];
    },

    saveReservations(reservations) {
        localStorage.setItem('arabela_reservations', JSON.stringify(reservations));
    }
};