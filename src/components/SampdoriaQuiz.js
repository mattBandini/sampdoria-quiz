'use client'

import React, { useState, useEffect } from 'react';
import { LogOut, Info } from 'lucide-react';
import { useFirebaseData } from '@/hooks/useFirebaseData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Search } from 'lucide-react';

        


// Componente Header separato
const Header = ({ playerProfile, onLogout }) => (
    <nav className="bg-blue-900 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <img 
                    src="/images/logo/sampdoria-logo.png" 
                    alt="Logo Sampdoria" 
                    className="h-12 w-12" 
                />
                <h1 className="text-2xl font-bold">NFooTball per Sampdoria</h1>
            </div>
            {playerProfile.name && (
                <div className="flex items-center space-x-4">
                    <img 
                        src={playerProfile.avatar} 
                        alt="Avatar" 
                        className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                    />
                    <span className="font-bold">{playerProfile.name}</span>
                    <button 
                        onClick={onLogout}
                        className="text-white hover:text-red-500 transition-colors"
                    >
                        <LogOut className="h-6 w-6" />
                    </button>
                </div>
            )}
        </div>
    </nav>
);

const StatsModal = ({ player, playerStats, isOpen, onClose }) => {
    // Retrieve stats directly from playerStats passed as prop
    const stats = playerStats[player?.name];
    
    if (!stats || !player) return null;

    const formatStatLabel = (key) => {
        const labels = {
            presenze: 'Presenze',
            gol: 'Gol',
            assist: 'Assist',
            tiriPartita: 'Tiri/Partita',
            golTesta: 'Gol di testa',
            golPunizione: 'Gol punizione',
            golUltimi10Min: 'Gol ultimi 10\'',
            cleanSheet: 'Clean sheet',
            parate: 'Parate',
            rigoriParati: 'Rigori parati',
            minutiImbattuto: 'Minuti imbattuto',
            uscite: 'Uscite',
            tackle: 'Tackle',
            intercetti: 'Intercetti',
            duelliVinti: 'Duelli vinti',
            passaggiRiusciti: 'Pass. riusciti',
            respinte: 'Respinte',
            recuperi: 'Recuperi',
            cross: 'Cross',
            assistPiazzati: 'Assist da piazzati',
            golArea: 'Gol in area'
        };
        return labels[key] || key;
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-3xl">
                <div className="flex justify-between items-start">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <div className="flex items-center gap-4">
                                <img 
                                    src={player.image} 
                                    alt={player.name}
                                    className="w-16 h-16 rounded-full border-2 border-blue-900"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
                                    <p className="text-sm text-gray-600">{player.position} • {player.years}</p>
                                </div>
                            </div>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-2"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">{formatStatLabel(key)}</p>
                            <p className="text-lg font-bold text-blue-900">{value}</p>
                        </div>
                    ))}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const avatars = [
    '/images/avatars/avatar1.png',
    '/images/avatars/avatar2.png',
    '/images/avatars/avatar3.png'
];

const Setup = () => {
    const [username, setUsername] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    
    const handleSave = () => {
        if (username.trim()) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('playerName', username);
                localStorage.setItem('playerAvatar', selectedAvatar);
            }
            setPlayerProfile({ name: username, avatar: selectedAvatar });
            setGameState('selection');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Personalizza il tuo profilo</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900">Nome Giocatore:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border rounded text-gray-900 bg-white"
                            placeholder="Inserisci il tuo nome"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-900">Scegli il tuo Avatar</label>
                        <div className="flex justify-center space-x-4">
                            {avatars.map((avatar, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedAvatar(avatar)}
                                    className={`p-2 rounded-full border-4 transition-all ${
                                        selectedAvatar === avatar 
                                        ? 'border-blue-900 scale-110' 
                                        : 'border-transparent hover:border-gray-300'
                                    }`}
                                >
                                    <img 
                                        src={avatar} 
                                        alt={`Avatar ${index + 1}`} 
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 transition-colors"
                        disabled={!username.trim()}
                    >
                        Salva Profilo
                    </button>
                </div>
            </div>
        </div>
    );
};

const ModeSelection = ({ onSelectMode }) => {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Scegli la modalità di gioco</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <button
            onClick={() => onSelectMode('singleplayer')}
            className="w-full py-2 px-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
          >
            Gioca contro il Computer
          </button>
          <button
            onClick={() => onSelectMode('multiplayer')}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500"
          >
            Gioca contro un Amico
          </button>
        </CardContent>
      </Card>
    );
  };

  const PlayerSelection = ({ 
    players, // Da Firebase
    playerStats, // Da Firebase
    selectedPlayers, 
    setSelectedPlayers, 
    setGameState,
    setSelectedPlayerStats,
    gameMode,
    currentPlayer,
    nextState
 }) => {
    const [searchTerm, setSearchTerm] = useState('');
 
    // Loading state
    if (!players || !playerStats) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></div>
            </div>
        );
    }
 
    const handlePlayerSelect = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(prev => prev.filter(p => p !== player));
        } else if (selectedPlayers.length < 5) {
            setSelectedPlayers(prev => [...prev, player]);
        }
    };
 
    const handleContinue = () => {
        setGameState(nextState);
    };
 
    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
    return (
        <Card className="w-full max-w-6xl mx-auto shadow-xl">
            <CardHeader className="bg-blue-900 text-white p-6 rounded-t-lg">
                <div>
                    <CardTitle className="text-2xl font-bold">
                        {gameMode === 'multiplayer' 
                            ? `Giocatore ${currentPlayer}: Forma la tua squadra` 
                            : 'Forma la tua squadra'}
                    </CardTitle>
                    <p className="text-blue-200 mt-2">Seleziona 5 giocatori blucerchiati degli ultimi 10 anni</p>
                </div>
            </CardHeader>
            
            <div className="sticky top-0 z-40 bg-white shadow-md">
                <div className="w-full bg-gray-200 h-1.5">
                    <div 
                        className="bg-blue-600 h-1.5 transition-all duration-300" 
                        style={{width: `${(selectedPlayers.length / 5) * 100}%`}}
                    ></div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Cerca un giocatore..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 border-2 border-blue-900/20 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-900/50" size={20} />
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                        <div className="text-right">
                            <div className="text-sm text-blue-900/80">Giocatori selezionati</div>
                            <div className={`text-2xl font-bold ${
                                selectedPlayers.length === 0 ? 'text-red-400' :
                                selectedPlayers.length < 3 ? 'text-yellow-400' :
                                selectedPlayers.length < 5 ? 'text-gray-900' :
                                'text-green-400'
                            }`}>
                                {selectedPlayers.length}/5
                            </div>
                        </div>
                        <button
                            onClick={handleContinue}
                            disabled={selectedPlayers.length !== 5}
                            className="bg-blue-900 text-white px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-800 transition-colors font-bold"
                        >
                            Continua
                        </button>
                    </div>
                </div>
            </div>
 
            <CardContent className="p-6">
                {['Portiere', 'Difensore', 'Centrocampista', 'Attaccante'].map(position => (
                    <div key={position} className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-blue-900 border-b-2 border-blue-900/20 pb-2">{position}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {filteredPlayers
                                .filter(p => p.position === position)
                                .map(player => (
                                    <div
                                        key={player.id}  // Usa l'ID da Firebase
                                        className={`relative p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-xl cursor-pointer group ${
                                            selectedPlayers.includes(player) 
                                            ? 'border-2 border-blue-900 bg-blue-50' 
                                            : 'hover:border-blue-900/30 hover:bg-blue-50/20'
                                        }`}
                                        onClick={(e) => {
                                            if (e.target.closest('button')) return;
                                            handlePlayerSelect(player);
                                        }}
                                    >
                                        <button 
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 mobile:opacity-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedPlayerStats({
                                                    ...player,
                                                    stats: playerStats[player.name]
                                                });
                                            }}
                                        >
                                            <Info className="h-4 w-4 text-blue-900" />
                                        </button>
 
                                        <img 
                                            src={player.image}
                                            alt={player.name}
                                            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-900/20 object-cover aspect-square group-hover:scale-105 transition-transform"
                                        />
                                        <div className="mt-3 text-center">
                                            <h3 className="font-bold text-gray-900 group-hover:text-blue-900">{player.name}</h3>
                                            <p className="text-sm text-gray-600">{player.position}</p>
                                            <p className="text-xs text-gray-500">{player.years}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
 };
 


 const TeamDisplay = ({ player1Team, player2Team, onStartQuiz, gameMode, player1Name, player2Name }) => {
    const [isLoading, setIsLoading] = useState(gameMode === 'singleplayer');
 
    useEffect(() => {
        if (gameMode === 'singleplayer') {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    }, [gameMode]);
 
    if (!player1Team || !player2Team) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></div>
            </div>
        );
    }
 
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900 mb-4"></div>
                <p className="text-gray-700 text-lg">Il computer sta scegliendo la sua squadra...</p>
            </div>
        );
    }
 
    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-2xl text-gray-900">Le Squadre</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Squadra Giocatore 1 */}
                    <div className="w-full md:w-1/2 bg-blue-50 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-blue-900">{player1Name}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {player1Team.map(player => (
                                <div 
                                    key={player.id} 
                                    className="flex flex-col items-center bg-white rounded-lg p-3 shadow transition-transform hover:scale-105"
                                >
                                    <img 
                                        src={player.image}
                                        alt={player.name}
                                        className="w-24 h-24 rounded-full object-cover aspect-square border-4 border-blue-500 mb-2"
                                    />
                                    <div className="text-center">
                                        <p className="font-semibold text-gray-900 text-sm">{player.name}</p>
                                        <p className="text-xs text-gray-600">{player.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
 
                    {/* Divisore */}
                    <div className="hidden md:block w-0.5 h-96 bg-gray-300"></div>
 
                    {/* Squadra Giocatore 2 o Computer */}
                    <div className="w-full md:w-1/2 bg-red-50 rounded-lg p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-4 text-center text-red-900">
                            {gameMode === 'singleplayer' ? 'Squadra Computer' : player2Name}
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {player2Team.map(player => (
                                <div 
                                    key={player.id} 
                                    className="flex flex-col items-center bg-white rounded-lg p-3 shadow transition-transform hover:scale-105"
                                >
                                    <img 
                                        src={player.image}
                                        alt={player.name}
                                        className="w-24 h-24 rounded-full object-cover aspect-square border-4 border-red-500 mb-2"
                                    />
                                    <div className="text-center">
                                        <p className="font-semibold text-gray-900 text-sm">{player.name}</p>
                                        <p className="text-xs text-gray-600">{player.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
 
                <div className="mt-8 text-center">
                    <button
                        onClick={onStartQuiz}
                        className="bg-blue-900 text-white px-10 py-3 rounded-lg hover:bg-blue-800 transition-colors text-lg font-bold shadow-md"
                    >
                        Inizia Quiz
                    </button>
                </div>
            </CardContent>
        </Card>
    );
 };

const Countdown = ({ timeLeft, totalTime = 10 }) => {
    const percentage = (timeLeft / totalTime) * 100;
    const strokeColor = timeLeft <= 3 ? '#EF4444' : '#1E3A8A'; // Rosso quando sotto 3 secondi, blu altrimenti

    return (
        <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#E6E6E6" strokeWidth="3" />
                    <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="3"
                        strokeDasharray="100 100"
                        strokeDashoffset={percentage}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                    <span className={`${timeLeft <= 3 ? 'text-red-500' : 'text-blue-900'}`}>
                        {timeLeft}
                    </span>
                </div>
                <div 
                    className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"
                    style={{ 
                        display: timeLeft <= 3 ? 'block' : 'none',
                        animationDuration: '1s' 
                    }}
                />
            </div>
            <span className="text-gray-600">Secondi rimanenti</span>
        </div>
    );
};

const QuizSection = ({ 
    player1Team, 
    player2Team, 
    onComplete, 
    gameMode, 
    player1Name, 
    player2Name,
    questions, 
    playerStats
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [player1SelectedForQuestion, setPlayer1SelectedForQuestion] = useState(null);
    const [player2SelectedForQuestion, setPlayer2SelectedForQuestion] = useState(null);
    const [winner, setWinner] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(1);

    // Shuffle and select questions when component mounts or questions change
    useEffect(() => {
        if (questions && questions.length > 0) {
            const shuffled = [...questions].sort(() => 0.5 - Math.random());
            setQuizQuestions(shuffled.slice(0, 5));
        }
    }, [questions]);

    useEffect(() => {
        let timer;
        if (!answered && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && !answered) {
            handleAnswer(null);
        }
        return () => clearInterval(timer);
    }, [timeLeft, answered]);

    const getComputerAnswer = () => {
        return player2Team[Math.floor(Math.random() * player2Team.length)];
    };

    const handleAnswer = (playerAnswer) => {
        if (answered) return;
        
        const currentQuestion = quizQuestions[currentQuestionIndex];
        
        if (gameMode === 'singleplayer') {
            setAnswered(true);
            setPlayer1SelectedForQuestion(playerAnswer);
            const computerAnswer = getComputerAnswer();
            setPlayer2SelectedForQuestion(computerAnswer);

            if (playerAnswer && computerAnswer) {
                const comparisonResult = currentQuestion.compare(playerAnswer, computerAnswer);
                
                if (comparisonResult > 0) {
                    setPlayer1Score(prev => prev + 3);
                    setWinner(playerAnswer);
                } else if (comparisonResult < 0) {
                    setPlayer2Score(prev => prev + 3);
                    setWinner(computerAnswer);
                } else {
                    setPlayer1Score(prev => prev + 1);
                    setPlayer2Score(prev => prev + 1);
                    setWinner(null);
                }
            } else if (playerAnswer) {
                setPlayer1Score(prev => prev + 3);
                setWinner(playerAnswer);
            } else if (computerAnswer) {
                setPlayer2Score(prev => prev + 3);
                setWinner(computerAnswer);
            }
        } else {
            if (currentPlayer === 1) {
                setPlayer1SelectedForQuestion(playerAnswer);
                setCurrentPlayer(2);
                setTimeLeft(10);
            } else {
                setAnswered(true);
                setPlayer2SelectedForQuestion(playerAnswer);
                if (player1SelectedForQuestion && playerAnswer) {
                    const comparisonResult = currentQuestion.compare(player1SelectedForQuestion, playerAnswer);
                    if (comparisonResult > 0) {
                        setPlayer1Score(prev => prev + 3);
                        setWinner(player1SelectedForQuestion);
                    } else if (comparisonResult < 0) {
                        setPlayer2Score(prev => prev + 3);
                        setWinner(playerAnswer);
                    } else {
                        setPlayer1Score(prev => prev + 1);
                        setPlayer2Score(prev => prev + 1);
                        setWinner(null);
                    }
                }
            }
        }

        if (answered || gameMode === 'singleplayer' || currentPlayer === 2) {
            setTimeout(() => {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    setAnswered(false);
                    setTimeLeft(10);
                    setPlayer1SelectedForQuestion(null);
                    setPlayer2SelectedForQuestion(null);
                    setWinner(null);
                    setCurrentPlayer(1);
                } else {
                    onComplete({ player1Score, player2Score });
                }
            }, 3000);
        }
    };

    if (quizQuestions.length === 0) return null;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold">
                        <span className="text-blue-900">Domanda </span>
                        <span className="text-blue-900 font-bold text-xl">{currentQuestionIndex + 1}</span>
                        <span className="text-blue-900"> di </span>
                        <span className="text-blue-900 font-bold text-xl">5</span>
                    </div>
                    <Countdown timeLeft={timeLeft} />
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                        className="h-2 bg-blue-900 rounded-full transition-all"
                        style={{ width: `${((currentQuestionIndex + 1) / 5) * 100}%` }}
                    />
                </div>
            </div>
    
            <Card className="mb-8 border border-blue-300 shadow-lg">
                <CardContent className="p-6 flex items-center justify-center min-h-[150px]">
                    <h2 className="text-3xl font-bold text-center text-blue-900">
                        {currentQuestion.text}
                    </h2>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="bg-blue-50">
                    <CardHeader>
                        <CardTitle className="text-center text-blue-900">{player1Name}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        {player1Team.map((player, index) => (
                            <div
                                key={`player1-${player.name}-${player.position}-${index}`}
                                className={`relative p-4 bg-white rounded-lg shadow transition-transform hover:scale-105 cursor-pointer ${
                                    player1SelectedForQuestion?.name === player.name ? 'border-4 border-blue-500' : ''
                                }`}
                                onClick={() => !answered && (gameMode === 'singleplayer' || currentPlayer === 1) && handleAnswer(player)}
                            >
                                <img 
                                    src={player.image}
                                    alt={player.name}
                                    className="w-20 h-20 mx-auto rounded-full border-4 border-blue-500 object-cover aspect-square"
                                />
                                <div className="mt-2 text-center">
                                    <h3 className="font-semibold text-gray-900">{player.name}</h3>
                                    <p className="text-sm text-gray-600">{player.position}</p>
                                    <p className="text-xs text-gray-500">{player.years}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className={gameMode === 'singleplayer' ? 'bg-red-50' : 'bg-green-50'}>
                    <CardHeader>
                        <CardTitle className="text-center text-red-900">{player2Name}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        {player2Team.map((player, index) => (
                            <div 
                                key={`player2-${player.name}-${player.position}-${index}`}
                                className={`p-4 bg-white rounded-lg shadow ${
                                    player2SelectedForQuestion?.name === player.name ? 'border-4 border-red-500' : ''
                                } ${gameMode === 'multiplayer' ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                                onClick={() => gameMode === 'multiplayer' && !answered && currentPlayer === 2 && handleAnswer(player)}
                            >
                                <img 
                                    src={player.image}
                                    alt={player.name}
                                    className="w-20 h-20 mx-auto rounded-full border-4 border-red-500 object-cover aspect-square"
                                />
                                <div className="mt-2 text-center">
                                    <h3 className="font-semibold text-gray-900">{player.name}</h3>
                                    <p className="text-sm text-gray-600">{player.position}</p>
                                    <p className="text-xs text-gray-500">{player.years}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {answered && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-lg max-w-2xl w-full relative">
                        <h3 className="text-2xl font-bold text-center mb-6 text-white">Risultato</h3>
                        <div className="flex justify-between items-center">
                            <div className="text-center w-1/2">
                                <h4 className="text-xl font-semibold mb-4 text-white">{player1Name}</h4>
                                {player1SelectedForQuestion ? (
                                    <div className={`inline-block p-4 rounded-lg border-2 ${player1SelectedForQuestion === winner ? 'border-green-500 bg-green-700' : winner ? 'border-red-500 bg-red-700' : 'border-yellow-500 bg-yellow-700'}`}>
                                        <img 
                                            src={player1SelectedForQuestion.image}
                                            alt={player1SelectedForQuestion.name}
                                            className="w-32 h-32 mx-auto rounded-full mb-2 object-cover aspect-square"
                                        />
                                        <p className="font-bold text-white">{player1SelectedForQuestion.name}</p>
                                        <p className="text-sm text-gray-300">{player1SelectedForQuestion.position}</p>
                                        <p className="text-sm text-gray-300">{currentQuestion.detail(player1SelectedForQuestion)}</p>
                                    </div>
                                ) : (
                                    <p className="text-white">Nessuna risposta</p>
                                )}
                            </div>
                            <div className="text-center w-1/2">
                                <h4 className="text-xl font-semibold mb-4 text-white">{player2Name}</h4>
                                {player2SelectedForQuestion ? (
                                    <div className={`inline-block p-4 rounded-lg border-2 ${player2SelectedForQuestion === winner ? 'border-green-500 bg-green-700' : winner ? 'border-red-500 bg-red-700' : 'border-yellow-500 bg-yellow-700'}`}>
                                        <img 
                                            src={player2SelectedForQuestion.image}
                                            alt={player2SelectedForQuestion.name}
                                            className="w-32 h-32 mx-auto rounded-full mb-2 object-cover aspect-square"
                                        />
                                        <p className="font-bold text-white">{player2SelectedForQuestion.name}</p>
                                        <p className="text-sm text-gray-300">{player2SelectedForQuestion.position}</p>
                                        <p className="text-sm text-gray-300">{currentQuestion.detail(player2SelectedForQuestion)}</p>
                                    </div>
                                ) : (
                                    <p className="text-white">Nessuna risposta</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            {winner ? (
                                <p className="text-xl text-white">
                                    Vincitore: <span className="font-bold text-green-400">{winner.name}</span>
                                </p>
                            ) : (
                                <p className="text-xl text-yellow-400">Pareggio</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
const Results = ({ scores, onRestart, gameMode, player1Name, player2Name }) => {
    console.log("Dati ricevuti in Results:", scores, gameMode, player1Name, player2Name);

    const { player1Score, player2Score } = scores;
    let resultType, title, description, iconEmoji;

    if (player1Score > player2Score) {
        resultType = 'Vittoria';
        if (gameMode === 'singleplayer') {
            title = 'Hai Vinto! 🏆';
            description = 'Complimenti! Hai dimostrato di conoscere alla perfezione la storia della Sampdoria.';
        } else {
            title = `${player1Name} ha vinto! 🏆`;
            description = `Grande partita! ${player1Name} si è aggiudicato la sfida.`;
        }
        iconEmoji = '🎉';
    } else if (player1Score < player2Score) {
        resultType = 'Sconfitta';
        if (gameMode === 'singleplayer') {
            title = 'Ha Vinto il Computer 🤖';
            description = 'Non scoraggiarti, c\'è sempre spazio per imparare di più sulla tua squadra del cuore.';
        } else {
            title = `${player2Name} ha vinto! 🏆`;
            description = `Grande partita! ${player2Name} si è aggiudicato la sfida.`;
        }
        iconEmoji = '💡';
    } else {
        resultType = 'Pareggio';
        title = 'Avete Pareggiato! ⚖️';
        description = 'Nessuno ha avuto la meglio. Un risultato che dimostra la vostra grande conoscenza.';
        iconEmoji = '🤝';
    }

    return (
        <Card className="max-w-xl mx-auto border-2 border-blue-900 shadow-lg">
            <CardContent className="p-8 space-y-6">
                <div className="text-center">
                    <div className="text-6xl mb-4">{iconEmoji}</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-gray-700 mb-6">{description}</p>

                    <div className="flex justify-center space-x-8 mb-6">
                        <div className="text-center">
                            <span className="block text-lg font-semibold text-gray-600 mb-2">{player1Name}</span>
                            <div className={`text-4xl font-bold ${player1Score > player2Score ? 'text-green-700' : 'text-gray-900'}`}>
                                {player1Score} punti
                            </div>
                        </div>
                        <div className="text-center">
                            <span className="block text-lg font-semibold text-gray-600 mb-2">{player2Name}</span>
                            <div className={`text-4xl font-bold ${player1Score < player2Score ? 'text-red-700' : 'text-gray-900'}`}>
                                {player2Score} punti
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onRestart}
                        className="w-full py-3 px-6 border-2 border-blue-900 text-blue-900 
                        rounded-lg font-bold hover:bg-blue-900 hover:text-white 
                        transition-colors duration-300"
                    >
                        Gioca Ancora
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};


const SampdoriaQuiz = () => {
    // Firebase data hook
    const { players, playerStats, questions, loading, error } = useFirebaseData();
    
    // State declarations
    const [computerTeam, setComputerTeam] = useState([]);
    const [gameState, setGameState] = useState('setup');
    const [gameMode, setGameMode] = useState(null);
    const [playerProfile, setPlayerProfile] = useState({    
        name: '',
        avatar: '/api/placeholder/40/40'
    });
    const [player2Profile, setPlayer2Profile] = useState(null);
    const [player1SelectedPlayers, setPlayer1SelectedPlayers] = useState([]);
    const [player2SelectedPlayers, setPlayer2SelectedPlayers] = useState([]);
    const [selectedPlayerStats, setSelectedPlayerStats] = useState(null);
    const [finalScores, setFinalScores] = useState(null);

    // Local storage and game state effect
    useEffect(() => {
        if (loading || players.length === 0) return;

        const storedName = typeof window !== 'undefined' ? localStorage.getItem('playerName') : null;
        const storedAvatar = typeof window !== 'undefined' ? localStorage.getItem('playerAvatar') : null;
        
        if (storedName) {
            setPlayerProfile({
                name: storedName,
                avatar: storedAvatar || '/api/placeholder/40/40'
            });
            setGameState('modeSelection');
        }
    }, [loading, players]);

    // Helper functions
    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('playerName');
            localStorage.removeItem('playerAvatar');
        }
        setGameState('setup');
        setPlayerProfile({ name: '', avatar: '/api/placeholder/40/40' });
        setPlayer1SelectedPlayers([]);
        setPlayer2SelectedPlayers([]);
        setFinalScores(null);
        setGameMode(null);
        setPlayer2Profile(null);
    };

    const handleQuizComplete = (scores) => {
        setFinalScores(scores);
        setGameState('results');
    };

    const handleRestart = () => {
        setPlayer1SelectedPlayers([]);
        setPlayer2SelectedPlayers([]);
        setFinalScores(null);
        setGameState('modeSelection');
    };

    const selectComputerTeam = () => {
        if (!players || players.length === 0) return;
        
        const computerSelection = [];
        while (computerSelection.length < 5) {
            const randomPlayer = players[Math.floor(Math.random() * players.length)];
            if (!computerSelection.includes(randomPlayer)) {
                computerSelection.push(randomPlayer);
            }
        }
        setComputerTeam(computerSelection);
    };

    const handleModeSelection = (mode) => {
        setGameMode(mode);
        if (mode === 'multiplayer') {
            setGameState('player2Setup');
        } else {
            selectComputerTeam();
            setGameState('player1Selection');
        }
    };

    // Loading and error states
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900 mb-4"></div>
                    <p className="text-xl text-gray-700">Caricamento dati...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p className="text-xl">Errore nel caricamento dei dati</p>
                    <p className="text-sm">{error.message}</p>
                </div>
            </div>
        );
    }

    // Setup component
    const Setup = ({ onComplete, playerNumber }) => {
        const [username, setUsername] = useState('');
        
        const handleSave = () => {
            if (username.trim()) {
                const profile = { name: username, avatar: '/api/placeholder/40/40' };
                if (playerNumber === 1) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('playerName', username);
                        localStorage.setItem('playerAvatar', '/api/placeholder/40/40');
                    }
                    setPlayerProfile(profile);
                } else {
                    setPlayer2Profile(profile);
                }
                onComplete(profile);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 w-96">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        {playerNumber === 2 ? "Profilo Giocatore 2" : "Personalizza il tuo profilo"}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-900">Nome Giocatore:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border rounded text-gray-900 bg-white"
                                placeholder="Inserisci il tuo nome"
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800 transition-colors"
                        >
                            Salva Profilo
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Mode Selection component
    const ModeSelection = ({ onSelectMode }) => {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Seleziona la Modalità di Gioco
                </h1>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Singleplayer Mode */}
                    <div 
                        className="relative w-80 h-96 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 border-4 border-blue-600"
                        onClick={() => onSelectMode('singleplayer')}
                    >
                        <img 
                            src="/images/modes/singleplayer.png" 
                            alt="Singleplayer" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Gioca contro il Computer</h2>
                            <p className="text-lg mb-6">
                                Sfida un'intelligenza artificiale nella battaglia di statistiche blucerchiate!
                            </p>
                            <button className="px-6 py-2 bg-white text-blue-900 font-semibold rounded-lg shadow-md hover:bg-gray-300">
                                Seleziona
                            </button>
                        </div>
                    </div>
    
                    {/* Multiplayer Mode */}
                    <div 
                        className="relative w-80 h-96 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 border-4 border-green-600"
                        onClick={() => onSelectMode('multiplayer')}
                    >
                        <img 
                            src="/images/modes/multiplayer.png" 
                            alt="Multiplayer" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <div className="absolute inset-0 bg-green-900 bg-opacity-60"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Gioca contro un Amico</h2>
                            <p className="text-lg mb-6">
                                Metti alla prova la tua conoscenza della Sampdoria sfidando un altro giocatore!
                            </p>
                            <button className="px-6 py-2 bg-white text-green-900 font-semibold rounded-lg shadow-md hover:bg-gray-300">
                                Seleziona
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header playerProfile={playerProfile} onLogout={handleLogout} />
            <main className="container mx-auto py-8 px-4">
                {(!playerProfile.name || gameState === 'setup') && 
                    <Setup onComplete={() => setGameState('modeSelection')} playerNumber={1} />}
                {gameState === 'modeSelection' && <ModeSelection onSelectMode={handleModeSelection} />}
                {gameState === 'player2Setup' && 
                    <Setup onComplete={() => setGameState('player1Selection')} playerNumber={2} />}
                {gameState === 'player1Selection' && (
                    <PlayerSelection 
                        players={players}
                        playerStats={playerStats}
                        selectedPlayers={player1SelectedPlayers}
                        setSelectedPlayers={setPlayer1SelectedPlayers}
                        setGameState={setGameState}
                        setSelectedPlayerStats={setSelectedPlayerStats}
                        gameMode={gameMode}
                        currentPlayer={1}
                        nextState={gameMode === 'singleplayer' ? 'team-display' : 'player2Selection'}
                    />
                )}
                {gameState === 'player2Selection' && (
                    <PlayerSelection 
                        players={players}
                        playerStats={playerStats}
                        selectedPlayers={player2SelectedPlayers}
                        setSelectedPlayers={setPlayer2SelectedPlayers}
                        setGameState={setGameState}
                        setSelectedPlayerStats={setSelectedPlayerStats}
                        gameMode={gameMode}
                        currentPlayer={2}
                        nextState="team-display"
                    />
                )}
                {gameState === 'team-display' && (
                    <TeamDisplay 
                        player1Team={player1SelectedPlayers}
                        player2Team={gameMode === 'singleplayer' ? computerTeam : player2SelectedPlayers}
                        onStartQuiz={() => setGameState('quiz')}
                        gameMode={gameMode}
                        player1Name={playerProfile.name}
                        player2Name={gameMode === 'multiplayer' ? player2Profile.name : 'Computer'}
                    />
                )}
                {gameState === 'quiz' && (
                    <QuizSection 
                        player1Team={player1SelectedPlayers} 
                        player2Team={gameMode === 'singleplayer' ? computerTeam : player2SelectedPlayers}
                        questions={questions}
                        playerStats={playerStats}
                        onComplete={handleQuizComplete} 
                        gameMode={gameMode}
                        player1Name={playerProfile.name}
                        player2Name={gameMode === 'multiplayer' ? player2Profile.name : 'Computer'}
                    />
                )}
                {gameState === 'results' && finalScores && 
                    <Results 
                        scores={finalScores} 
                        onRestart={handleRestart} 
                        gameMode={gameMode}
                        player1Name={playerProfile.name}
                        player2Name={gameMode === 'multiplayer' ? player2Profile.name : 'Computer'}
                    />
                }
                
                <StatsModal 
                    player={selectedPlayerStats}
                    playerStats={playerStats}
                    isOpen={!!selectedPlayerStats}
                    onClose={() => setSelectedPlayerStats(null)}
                />
            </main>
            <footer className="bg-blue-900 text-white p-4 text-center mt-auto">
                <p>&copy; 2024 Sfida Sampdoriana. Un quiz game sulle statistiche della Sampdoria.</p>
            </footer>
        </div>
    );
};

export default SampdoriaQuiz;