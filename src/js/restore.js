const ArabelaRestore = {
    async fromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    // Validate structure before committing to storage
                    if (!data.gowns || !data.reservations) {
                        throw new Error("Invalid Backup Format: Missing core tables.");
                    }

                    // Overwrite system state
                    localStorage.setItem('arabela_gowns', JSON.stringify(data.gowns));
                    localStorage.setItem('arabela_reservations', JSON.stringify(data.reservations));
                    
                    // Optional: Restore system config
                    if (data.config) {
                        localStorage.setItem('arabela_config', JSON.stringify(data.config));
                    }

                    resolve(true);
                } catch (err) {
                    reject(err.message);
                }
            };

            reader.onerror = () => reject("File reading failed.");
            reader.readAsText(file);
        });
    }
};