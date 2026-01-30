// Main entry point for the plugin
async function init() {
    // Fetch on initial load
    await fetchModelData();
}

async function fetchModelData() {
    const statusDiv = document.getElementById('status');
    const modelsList = document.getElementById('modelsList');

    try {
        statusDiv.textContent = 'Fetching model data...';
        modelsList.innerHTML = '';

        const response = await fetch('https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/non-adobe-models-in-adobe-products.html');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const html = await response.text();
        const models = parseModelData(html);

        if (models.length === 0) {
            statusDiv.textContent = 'No models found';
            return;
        }

        statusDiv.textContent = `Found ${models.length} models`;
        displayModels(models);

    } catch (error) {
        statusDiv.textContent = `Error: ${error.message}`;
        console.error('Error fetching model data:', error);
    }
}

function parseModelData(html) {
    const models = [];
    
    // Find all tables
    const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
    const tableMatches = [...html.matchAll(tableRegex)];
    
    tableMatches.forEach((tableMatch, tableIndex) => {
        const tableHtml = tableMatch[1];
        
        // Find all rows
        const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
        const rowMatches = [...tableHtml.matchAll(rowRegex)];
        
        // Skip first row (headers)
        for (let i = 1; i < rowMatches.length; i++) {
            const rowHtml = rowMatches[i][1];
            
            // Find all td cells
            const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
            const cells = [...rowHtml.matchAll(cellRegex)];
            
            // Skip rows with no cells (empty rows)
            if (cells.length === 0) continue;
            
            // Extract model name from first cell
            const modelName = stripHtmlTags(cells[0][1]);
            
            // Determine which cell has the credit info
            let creditInfo = '';
            
            if (cells.length === 3) {
                // First table has 3 columns, skip it (it only has availability info)
                continue;
            } else if (cells.length === 2) {
                // Tables 2-5 have credit info in the second column
                creditInfo = stripHtmlTags(cells[1][1]);
            }
            
            // Only add if both fields have content
            if (modelName && creditInfo && 
                !modelName.toLowerCase().includes('generative credits used')) {
                models.push({
                    model: modelName.trim(),
                    credits: creditInfo.trim()
                });
            }
        }
    });

    return models;
}

// Helper function to strip HTML tags and clean up text
function stripHtmlTags(html) {
    if (!html) return '';
    
    // Remove script and style tags and their content
    let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // Remove all HTML tags
    text = text.replace(/<[^>]+>/g, ' ');
    
    // Decode HTML entities
    text = text.replace(/&nbsp;/g, ' ');
    text = text.replace(/&amp;/g, '&');
    text = text.replace(/&lt;/g, '<');
    text = text.replace(/&gt;/g, '>');
    text = text.replace(/&quot;/g, '"');
    text = text.replace(/&#039;/g, "'");
    text = text.replace(/&#x27;/g, "'");
    text = text.replace(/&apos;/g, "'");
    
    // Replace multiple whitespaces with single space
    text = text.replace(/\s+/g, ' ');
    
    // Trim whitespace
    text = text.trim();
    
    return text;
}

function displayModels(models) {
    const modelsList = document.getElementById('modelsList');
    modelsList.innerHTML = '';

    models.forEach(modelData => {
        const modelItem = document.createElement('div');
        modelItem.className = 'model-item';

        const modelName = document.createElement('div');
        modelName.className = 'model-name';
        modelName.textContent = modelData.model;

        const modelCredits = document.createElement('div');
        modelCredits.className = 'model-credits';
        modelCredits.textContent = modelData.credits;

        modelItem.appendChild(modelName);
        modelItem.appendChild(modelCredits);
        modelsList.appendChild(modelItem);
    });
}

// Initialize when the panel is loaded
document.addEventListener('DOMContentLoaded', init);