/**
 * Arabela Database Logic
 * Ensures data consistency across Inventory, Reservations, and Dashboard.
 */

const ArabelaDB = {
    // 1. Core Fetching
    getGowns: () => JSON.parse(localStorage.getItem('arabela_inventory') || '[]'),
    getReservations: () => JSON.parse(localStorage.getItem('arabela_reservations') || '[]'),

    // 2. Core Saving
    saveGowns: (data) => localStorage.setItem('arabela_inventory', JSON.stringify(data)),
    saveReservations: (data) => localStorage.setItem('arabela_reservations', JSON.stringify(data)),

    // 3. Business Logic: Sync Status
    // When a gown is reserved, its status in the inventory MUST change.
    syncGownStatus: (gownId, newStatus) => {
        const gowns = ArabelaDB.getGowns();
        const index = gowns.findIndex(g => g.id === gownId);
        if (index !== -1) {
            gowns[index].status = newStatus;
            ArabelaDB.saveGowns(gowns);
        }
    }
};

// Make it globally accessible
window.ArabelaDB = ArabelaDB;