// Database delle domande
const questions = [
    {
        text: "Chi ha segnato più gol in carriera con la Sampdoria?",
        compare: (a, b) => (playerStats[a.name].gol || 0) - (playerStats[b.name].gol || 0),
        detail: player => `${playerStats[player.name].gol || 0} gol totali con la Sampdoria`
    },
    {
        text: "Chi ha fornito più assist in carriera?",
        compare: (a, b) => (playerStats[a.name].assist || 0) - (playerStats[b.name].assist || 0),
        detail: player => `${playerStats[player.name].assist || 0} assist totali`
    },
    {
        text: "Chi ha giocato più partite con la maglia della Sampdoria?",
        compare: (a, b) => (playerStats[a.name].presenze || 0) - (playerStats[b.name].presenze || 0),
        detail: player => `${playerStats[player.name].presenze || 0} presenze totali`
    },
    {
        text: "Chi ha segnato più gol su punizione?",
        compare: (a, b) => (playerStats[a.name].golPunizione || 0) - (playerStats[b.name].golPunizione || 0),
        detail: player => `${playerStats[player.name].golPunizione || 0} gol su punizione`
    },
    {
        text: "Chi ha effettuato più dribbling riusciti in carriera?",
        compare: (a, b) => (playerStats[a.name].dribbling || 0) - (playerStats[b.name].dribbling || 0),
        detail: player => `${playerStats[player.name].dribbling || 0} dribbling riusciti`
    },
    {
        text: "Chi ha segnato più gol di testa?",
        compare: (a, b) => (playerStats[a.name].golTesta || 0) - (playerStats[b.name].golTesta || 0),
        detail: player => `${playerStats[player.name].golTesta || 0} gol di testa`
    },
    {
        text: "Chi ha vinto più duelli aerei?",
        compare: (a, b) => parseFloat(playerStats[a.name].duelliVinti || 0) - parseFloat(playerStats[b.name].duelliVinti || 0),
        detail: player => `${playerStats[player.name].duelliVinti || 0}% di duelli aerei vinti`
    },
    {
        text: "Chi ha subito più falli in una stagione?",
        compare: (a, b) => (playerStats[a.name].falliSubiti || 0) - (playerStats[b.name].falliSubiti || 0),
        detail: player => `${playerStats[player.name].falliSubiti || 0} falli subiti in una stagione`
    },
    {
        text: "Chi ha effettuato più intercetti in carriera?",
        compare: (a, b) => (playerStats[a.name].intercetti || 0) - (playerStats[b.name].intercetti || 0),
        detail: player => `${playerStats[player.name].intercetti || 0} intercetti totali`
    },
    {
        text: "Chi ha più clean sheet in carriera?",
        compare: (a, b) => (playerStats[a.name].cleanSheet || 0) - (playerStats[b.name].cleanSheet || 0),
        detail: player => `${playerStats[player.name].cleanSheet || 0} clean sheet`
    },
    {
        text: "Chi ha parato più rigori?",
        compare: (a, b) => (playerStats[a.name].rigoriParati || 0) - (playerStats[b.name].rigoriParati || 0),
        detail: player => `${playerStats[player.name].rigoriParati || 0} rigori parati`
    },
    {
        text: "Chi ha effettuato più cross in carriera?",
        compare: (a, b) => (playerStats[a.name].cross || 0) - (playerStats[b.name].cross || 0),
        detail: player => `${playerStats[player.name].cross || 0} cross totali`
    },
    {
        text: "Chi ha corso più km in una partita?",
        compare: (a, b) => (playerStats[a.name].kmPartita || 0) - (playerStats[b.name].kmPartita || 0),
        detail: player => `${playerStats[player.name].kmPartita || 0} km percorsi in una partita`
    },
    {
        text: "Chi ha ricevuto più cartellini gialli?",
        compare: (a, b) => (playerStats[a.name].cartelliniGialli || 0) - (playerStats[b.name].cartelliniGialli || 0),
        detail: player => `${playerStats[player.name].cartelliniGialli || 0} cartellini gialli`
    },
    {
        text: "Chi ha segnato più gol nei minuti finali (80'+)?",
        compare: (a, b) => (playerStats[a.name].golUltimi10Min || 0) - (playerStats[b.name].golUltimi10Min || 0),
        detail: player => `${playerStats[player.name].golUltimi10Min || 0} gol negli ultimi 10 minuti`
    },
    {
        text: "Chi ha effettuato più tackle in carriera?",
        compare: (a, b) => (playerStats[a.name].tackle || 0) - (playerStats[b.name].tackle || 0),
        detail: player => `${playerStats[player.name].tackle || 0} tackle riusciti`
    },
    {
        text: "Chi ha fatto più recuperi palla?",
        compare: (a, b) => (playerStats[a.name].recuperi || 0) - (playerStats[b.name].recuperi || 0),
        detail: player => `${playerStats[player.name].recuperi || 0} recuperi di palla`
    },
    {
        text: "Chi ha la percentuale più alta di passaggi riusciti?",
        compare: (a, b) => parseFloat(playerStats[a.name].passaggiRiusciti || 0) - parseFloat(playerStats[b.name].passaggiRiusciti || 0),
        detail: player => `${playerStats[player.name].passaggiRiusciti || 0}% di passaggi riusciti`
    },
    {
        text: "Chi ha giocato più stagioni consecutive con la Sampdoria?",
        compare: (a, b) => (playerStats[a.name].stagioniConsecutive || 0) - (playerStats[b.name].stagioniConsecutive || 0),
        detail: player => `${playerStats[player.name].stagioniConsecutive || 0} stagioni consecutive`
    },

        {
            text: "Chi ha segnato più gol in una singola stagione?",
            compare: (a, b) => (playerStats[a.name].maxGolStagione || 0) - (playerStats[b.name].maxGolStagione || 0),
            detail: player => `${playerStats[player.name].maxGolStagione || 0} gol in una stagione`
        },
        {
            text: "Chi ha servito più assist in una singola stagione?",
            compare: (a, b) => (playerStats[a.name].maxAssistStagione || 0) - (playerStats[b.name].maxAssistStagione || 0),
            detail: player => `${playerStats[player.name].maxAssistStagione || 0} assist in una stagione`
        },
        {
            text: "Chi ha parato più rigori in una stagione?",
            compare: (a, b) => (playerStats[a.name].rigoriParati || 0) - (playerStats[b.name].rigoriParati || 0),
            detail: player => `${playerStats[player.name].rigoriParati || 0} rigori parati in una stagione`
        },
        {
            text: "Chi ha effettuato più dribbling riusciti in una singola stagione?",
            compare: (a, b) => (playerStats[a.name].dribbling || 0) - (playerStats[b.name].dribbling || 0),
            detail: player => `${playerStats[player.name].dribbling || 0} dribbling riusciti`
        },
        {
            text: "Chi ha il record di clean sheet in una stagione?",
            compare: (a, b) => (playerStats[a.name].cleanSheet || 0) - (playerStats[b.name].cleanSheet || 0),
            detail: player => `${playerStats[player.name].cleanSheet || 0} clean sheet`
        },
        {
            text: "Chi ha segnato più gol nell'area di rigore?",
            compare: (a, b) => (playerStats[a.name].golArea || 0) - (playerStats[b.name].golArea || 0),
            detail: player => `${playerStats[player.name].golArea || 0} gol in area di rigore`
        },
        {
            text: "Chi ha segnato più gol al debutto con la Sampdoria?",
            compare: (a, b) => (playerStats[a.name].golDebutto || 0) - (playerStats[b.name].golDebutto || 0),
            detail: player => `${playerStats[player.name].golDebutto || 0} gol al debutto`
        },
        {
            text: "Chi ha toccato più palloni in una stagione?",
            compare: (a, b) => (playerStats[a.name].tocchiPalla || 0) - (playerStats[b.name].tocchiPalla || 0),
            detail: player => `${playerStats[player.name].tocchiPalla || 0} tocchi di palla in stagione`
        },
        {
            text: "Chi ha il record di partite consecutive giocate?",
            compare: (a, b) => (playerStats[a.name].partiteConsecutive || 0) - (playerStats[b.name].partiteConsecutive || 0),
            detail: player => `${playerStats[player.name].partiteConsecutive || 0} partite consecutive`
        },
        {
            text: "Chi ha corso più chilometri in una stagione?",
            compare: (a, b) => (playerStats[a.name].kmPartita || 0) - (playerStats[b.name].kmPartita || 0),
            detail: player => `${playerStats[player.name].kmPartita || 0} km percorsi in media a partita`
        },
        {
            text: "Chi ha realizzato più assist su calcio d'angolo?",
            compare: (a, b) => (playerStats[a.name].assistPiazzati || 0) - (playerStats[b.name].assistPiazzati || 0),
            detail: player => `${playerStats[player.name].assistPiazzati || 0} assist su calcio d'angolo`
        },
        {
            text: "Chi ha commesso più falli in carriera?",
            compare: (a, b) => (playerStats[a.name].falliCommessi || 0) - (playerStats[b.name].falliCommessi || 0),
            detail: player => `${playerStats[player.name].falliCommessi || 0} falli commessi`
        },
        {
            text: "Chi ha il record di più passaggi chiave effettuati?",
            compare: (a, b) => (playerStats[a.name].passaggiChiave || 0) - (playerStats[b.name].passaggiChiave || 0),
            detail: player => `${playerStats[player.name].passaggiChiave || 0} passaggi chiave`
        },
        {
            text: "Chi ha segnato più gol da fuori area?",
            compare: (a, b) => (playerStats[a.name].golFuoriArea || 0) - (playerStats[b.name].golFuoriArea || 0),
            detail: player => `${playerStats[player.name].golFuoriArea || 0} gol da fuori area`
        },
        {
            text: "Chi ha la percentuale più alta di conversione tiri/gol?",
            compare: (a, b) => parseFloat(playerStats[a.name].conversioneTiriGol || 0) - parseFloat(playerStats[b.name].conversioneTiriGol || 0),
            detail: player => `${playerStats[player.name].conversioneTiriGol || 0}% di conversione tiri/gol`
        },
        {
            text: "Chi ha giocato il maggior numero di minuti in una stagione?",
            compare: (a, b) => (playerStats[a.name].minutiGiocati || 0) - (playerStats[b.name].minutiGiocati || 0),
            detail: player => `${playerStats[player.name].minutiGiocati || 0} minuti giocati in una stagione`
        },
        {
            text: "Chi ha effettuato più respinte difensive?",
            compare: (a, b) => (playerStats[a.name].respinte || 0) - (playerStats[b.name].respinte || 0),
            detail: player => `${playerStats[player.name].respinte || 0} respinte difensive`
        },
        {
            text: "Chi ha subito più ammonizioni in una stagione?",
            compare: (a, b) => (playerStats[a.name].cartelliniGialli || 0) - (playerStats[b.name].cartelliniGialli || 0),
            detail: player => `${playerStats[player.name].cartelliniGialli || 0} ammonizioni`
        },
        {
            text: "Chi ha giocato più partite senza essere sostituito?",
            compare: (a, b) => (playerStats[a.name].partiteIntere || 0) - (playerStats[b.name].partiteIntere || 0),
            detail: player => `${playerStats[player.name].partiteIntere || 0} partite giocate per intero`
        },
        {
            text: "Chi ha mantenuto più minuti di imbattibilità?",
            compare: (a, b) => (playerStats[a.name].minutiImbattuto || 0) - (playerStats[b.name].minutiImbattuto || 0),
            detail: player => `${playerStats[player.name].minutiImbattuto || 0} minuti di imbattibilità`
        }
    ];