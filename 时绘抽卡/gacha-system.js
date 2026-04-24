// 抽卡系统核心逻辑

// 全局状态
let currentState = {
    poolType: 'permanent', // 'permanent' 或 'limited'
    poolName: '', // 限定池名称
    pityCount: 0, // SSR保底计数
    limitedPityCount: 0, // 限定SSR保底计数（仅限定池）
    hasDrawnLimitedSSR: false, // 是否已经抽到过限定SSR（用于取消160保底）
    history: [] // 抽卡历史
};

// 初始化卡池
function initializePool(poolType, poolName = '') {
    currentState.poolType = poolType;
    currentState.poolName = poolName;
    
    // 从localStorage加载数据
    loadState();
    
    // 更新UI
    updatePityDisplay();
    displayPoolCards();
    displayHistory();
}

// 从localStorage加载状态
function loadState() {
    const storageKey = getStorageKey();
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
        const data = JSON.parse(saved);
        currentState.pityCount = data.pityCount || 0;
        currentState.limitedPityCount = data.limitedPityCount || 0;
        currentState.hasDrawnLimitedSSR = data.hasDrawnLimitedSSR || false;
        currentState.history = data.history || [];
    } else {
        currentState.pityCount = 0;
        currentState.limitedPityCount = 0;
        currentState.hasDrawnLimitedSSR = false;
        currentState.history = [];
    }
}

// 保存状态到localStorage
function saveState() {
    const storageKey = getStorageKey();
    const data = {
        pityCount: currentState.pityCount,
        limitedPityCount: currentState.limitedPityCount,
        hasDrawnLimitedSSR: currentState.hasDrawnLimitedSSR,
        history: currentState.history
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
}

// 获取存储键名
function getStorageKey() {
    if (currentState.poolType === 'permanent') {
        return 'gacha_permanent';
    } else {
        return `gacha_limited_${encodeURIComponent(currentState.poolName)}`;
    }
}

// 单次抽卡
function drawSingle() {
    const card = performDraw();
    const result = [card];
    
    // 显示结果
    revealCards(result);
    
    // 添加到历史记录
    addToHistory(result);
    
    // 保存状态
    saveState();
    
    // 更新UI
    updatePityDisplay();
    displayHistory(); // 刷新抽卡记录
}

// 十连抽卡
function drawTen() {
    const results = [];
    let hasSR = false;
    
    // 先进行9次普通抽取
    for (let i = 0; i < 9; i++) {
        const card = performDraw();
        results.push(card);
        if (card.rarity === 'SR') {
            hasSR = true;
        }
    }
    
    // 第10抽：如果没有SR，则强制抽取SR
    if (!hasSR) {
        const card = drawSR();
        results.push(card);
    } else {
        const card = performDraw();
        results.push(card);
    }
    
    // 显示结果
    revealCards(results);
    
    // 添加到历史记录
    addToHistory(results);
    
    // 保存状态
    saveState();
    
    // 更新UI
    updatePityDisplay();
    displayHistory(); // 刷新抽卡记录
}

// 执行单次抽取（核心逻辑）
function performDraw() {
    const rand = Math.random();
    
    // 检查保底
    if (currentState.poolType === 'limited') {
        // 限定池逻辑
        if (currentState.pityCount >= 79) {
            // 80抽保底SSR
            currentState.pityCount = 0;
            
            // 如果已经抽到过限定SSR，或者未达到160抽，则按普通SSR处理
            if (!currentState.hasDrawnLimitedSSR && currentState.limitedPityCount >= 159) {
                // 160抽必出限定SSR - 触发后标记已抽取
                currentState.hasDrawnLimitedSSR = true;
                currentState.limitedPityCount = 0;
                return drawLimitedSSR();
            } else {
                // 普通SSR（可能常驻也可能限定）
                if (!currentState.hasDrawnLimitedSSR) {
                    currentState.limitedPityCount++;
                }
                return drawSSR();
            }
        } else {
            // 未达到保底，按概率抽取
            currentState.pityCount++;
            
            // 只有未抽到过限定SSR时，才累加160保底计数
            if (!currentState.hasDrawnLimitedSSR) {
                currentState.limitedPityCount++;
            }
            
            if (rand < 0.02) {
                // SSR (2%) - 抽出SSR后重置保底
                currentState.pityCount = 0;
                return drawSSR();
            } else if (rand < 0.12) {
                // SR (10%)
                return drawSR();
            } else {
                // R (88%)
                return drawR();
            }
        }
    } else {
        // 常驻池逻辑
        if (currentState.pityCount >= 79) {
            // 80抽保底SSR
            currentState.pityCount = 0;
            return drawSSR();
        } else {
            currentState.pityCount++;
            
            if (rand < 0.02) {
                // SSR (2%) - 抽出SSR后重置保底
                currentState.pityCount = 0;
                return drawSSR();
            } else if (rand < 0.12) {
                // SR (10%)
                return drawSR();
            } else {
                // R (88%)
                return drawR();
            }
        }
    }
}

// 抽取SSR
function drawSSR() {
    if (currentState.poolType === 'limited') {
        // 限定池：常驻SSR和限定SSR概率相等（50% vs 50%）
        const isLimited = Math.random() < 0.5;
        
        if (isLimited) {
            // 抽取限定SSR - 标记已抽取，取消160保底机制
            currentState.hasDrawnLimitedSSR = true;
            currentState.limitedPityCount = 0;
            const pool = getCurrentPool();
            const limitedSSR = pool.ssr;
            const index = Math.floor(Math.random() * limitedSSR.length);
            return {
                ...limitedSSR[index],
                rarity: 'SSR'
            };
        } else {
            // 抽取常驻SSR - 不改变hasDrawnLimitedSSR状态
            const permanentSSR = gameData.permanent.ssr;
            const index = Math.floor(Math.random() * permanentSSR.length);
            return {
                ...permanentSSR[index],
                rarity: 'SSR'
            };
        }
    } else {
        // 常驻池：只从常驻SSR中抽取
        const permanentSSR = gameData.permanent.ssr;
        const index = Math.floor(Math.random() * permanentSSR.length);
        return {
            ...permanentSSR[index],
            rarity: 'SSR'
        };
    }
}

// 抽取限定SSR
function drawLimitedSSR() {
    const pool = getCurrentPool();
    const limitedSSR = pool.ssr;
    
    // 从限定SSR中随机选择
    const index = Math.floor(Math.random() * limitedSSR.length);
    return {
        ...limitedSSR[index],
        rarity: 'SSR'
    };
}

// 抽取SR
function drawSR() {
    const pool = getCurrentPool();
    const allSR = [...pool.sr || []];
    
    // 如果是限定池，包含常驻SR
    if (currentState.poolType === 'limited') {
        const permanentSR = gameData.permanent.sr;
        allSR.push(...permanentSR);
    }
    
    const index = Math.floor(Math.random() * allSR.length);
    return {
        ...allSR[index],
        rarity: 'SR'
    };
}

// 抽取R
function drawR() {
    const pool = getCurrentPool();
    const allR = [...pool.r || []];
    
    // 如果是限定池，包含常驻R
    if (currentState.poolType === 'limited') {
        const permanentR = gameData.permanent.r;
        allR.push(...permanentR);
    }
    
    const index = Math.floor(Math.random() * allR.length);
    return {
        ...allR[index],
        rarity: 'R'
    };
}

// 获取当前卡池数据
function getCurrentPool() {
    if (currentState.poolType === 'permanent') {
        return gameData.permanent;
    } else {
        const limitedPool = gameData.limited[currentState.poolName];
        if (!limitedPool) {
            console.error('未找到限定池:', currentState.poolName);
            return gameData.permanent;
        }
        
        // 限定池包含常驻池的所有卡 + 限定SSR
        return {
            ssr: limitedPool.ssr,
            sr: gameData.permanent.sr,
            r: gameData.permanent.r
        };
    }
}

// 翻牌效果显示卡牌
function revealCards(cards) {
    const revealArea = document.getElementById('cardRevealArea');
    revealArea.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        
        // 创建卡牌正面（卡背）
        const cardFront = document.createElement('div');
        cardFront.className = 'card-face card-front';
        cardFront.innerHTML = '?';
        
        // 创建卡牌背面（揭示面）
        const cardBack = document.createElement('div');
        cardBack.className = `card-face card-back ${card.rarity.toLowerCase()}`;
        cardBack.innerHTML = `
            <div class="card-rarity">${card.rarity}</div>
            <div class="card-name">${card.name}</div>
            <div class="card-character">${card.character}</div>
        `;
        
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        cardContainer.appendChild(cardElement);
        revealArea.appendChild(cardContainer);
        
        // 延迟翻牌，创造动画效果
        setTimeout(() => {
            cardElement.classList.add('flipped');
        }, 300 + index * 200);
    });
}

// 添加到历史记录
function addToHistory(cards) {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    cards.forEach(card => {
        currentState.history.unshift({
            ...card,
            time: timeStr
        });
    });
}

// 显示历史记录
function displayHistory(page = 1) {
    const tbody = document.getElementById('historyTableBody');
    if (!tbody) return; // 防止元素不存在
    
    const itemsPerPage = 20;
    const totalPages = Math.ceil(currentState.history.length / itemsPerPage);
    
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = currentState.history.slice(start, end);
    
    tbody.innerHTML = '';
    
    if (pageData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #a0aec0;">暂无抽卡记录</td></tr>';
    } else {
        pageData.forEach((record, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>${record.name}</td>
                <td>${record.character}</td>
                <td><span class="rarity-badge ${record.rarity.toLowerCase()}">${record.rarity}</span></td>
                <td>${record.time}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // 显示分页
    displayPagination(page, totalPages);
}

// 显示分页控件
function displayPagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = `
        <button onclick="displayHistory(1)" ${currentPage === 1 ? 'disabled' : ''}>首页</button>
        <button onclick="displayHistory(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>
        <span>第 ${currentPage} / ${totalPages} 页</span>
        <button onclick="displayHistory(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>
        <button onclick="displayHistory(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''}>末页</button>
    `;
    
    pagination.innerHTML = html;
}

// 更新保底显示
function updatePityDisplay() {
    const currentPityEl = document.getElementById('currentPity');
    const remainingPityEl = document.getElementById('remainingPity');
    const totalDrawsEl = document.getElementById('totalDraws');
    
    if (currentPityEl && remainingPityEl) {
        currentPityEl.textContent = currentState.pityCount;
        remainingPityEl.textContent = 80 - currentState.pityCount;
    }
    
    // 显示总抽数
    if (totalDrawsEl) {
        totalDrawsEl.textContent = currentState.history.length;
    }
}

// 显示卡池卡牌信息
function displayPoolCards() {
    const container = document.getElementById('poolCardsList');
    if (!container) return;
    
    const pool = getCurrentPool();
    
    let html = '';
    
    // 如果是限定池，先显示限定SSR
    if (currentState.poolType === 'limited' && pool.ssr && pool.ssr.length > 0) {
        html += `
            <div class="rarity-group">
                <div class="rarity-title ssr-limited">🎯 限定SSR (${pool.ssr.length}张)</div>
                <div class="card-names">
                    ${pool.ssr.map(card => `${card.name}（${card.character}）`).join('；')}
                </div>
            </div>
        `;
    }
    
    // 显示常驻SSR
    const permanentSSR = gameData.permanent.ssr;
    if (permanentSSR && permanentSSR.length > 0) {
        html += `
            <div class="rarity-group">
                <div class="rarity-title ssr">⭐ 常驻SSR (${permanentSSR.length}张)</div>
                <div class="card-names">
                    ${permanentSSR.map(card => `${card.name}（${card.character}）`).join('；')}
                </div>
            </div>
        `;
    }
    
    // SR
    const allSR = pool.sr || gameData.permanent.sr;
    if (allSR && allSR.length > 0) {
        html += `
            <div class="rarity-group">
                <div class="rarity-title sr">SR (${allSR.length}张)</div>
                <div class="card-names">
                    ${allSR.map(card => `${card.name}（${card.character}）`).join('；')}
                </div>
            </div>
        `;
    }
    
    // R
    const allR = pool.r || gameData.permanent.r;
    if (allR && allR.length > 0) {
        html += `
            <div class="rarity-group">
                <div class="rarity-title r">R (${allR.length}张)</div>
                <div class="card-names">
                    ${allR.map(card => `${card.name}（${card.character}）`).join('；')}
                </div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// 重置档案
function resetArchive() {
    if (confirm('确定要重置档案吗？这将清空所有抽卡记录和保底计数。')) {
        currentState.pityCount = 0;
        currentState.limitedPityCount = 0;
        currentState.hasDrawnLimitedSSR = false;
        currentState.history = [];
        saveState();
        updatePityDisplay();
        displayHistory();
        
        // 清空卡牌显示区域
        const revealArea = document.getElementById('cardRevealArea');
        if (revealArea) {
            revealArea.innerHTML = '<p style="color: #a0aec0; font-size: 1.1em;">点击抽卡按钮开始抽卡 ✨</p>';
        }
        
        alert('档案已重置！');
    }
}

// 切换卡池
function switchPool() {
    const selector = document.getElementById('poolSelector');
    const value = selector.value;
    
    if (value === 'permanent') {
        location.href = 'permanent-pool.html';
    } else {
        location.href = `limited-pool.html?pool=${encodeURIComponent(value)}`;
    }
}

// 填充卡池选择器
function populatePoolSelector() {
    const selector = document.getElementById('poolSelector');
    if (!selector) return;
    
    // 添加限定池选项
    Object.keys(gameData.limited).forEach(poolName => {
        const option = document.createElement('option');
        option.value = poolName;
        option.textContent = poolName;
        
        // 如果当前是限定池且名称匹配，设置为选中
        if (currentState.poolType === 'limited' && currentState.poolName === poolName) {
            option.selected = true;
        }
        
        selector.appendChild(option);
    });
}
