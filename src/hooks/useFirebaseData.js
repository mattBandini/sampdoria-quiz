import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useFirebaseData = () => {
    const [players, setPlayers] = useState([]);
    const [playerStats, setPlayerStats] = useState({});
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                // Fetch players
                const playersSnapshot = await getDocs(collection(db, 'players'));
                const playersData = playersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPlayers(playersData);

                // Fetch player stats
                const statsSnapshot = await getDocs(collection(db, 'playerStats'));
                const statsData = {};
                statsSnapshot.docs.forEach(doc => {
                    const data = doc.data();
                    const playerDoc = playersData.find(p => p.id === data.playerId);
                    if (playerDoc) {
                        statsData[playerDoc.name] = data;
                    }
                });
                setPlayerStats(statsData);

                // Fetch questions
                const questionsSnapshot = await getDocs(collection(db, 'questions'));
                const questionsData = questionsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        text: data.text,
                        compare: (a, b) => (statsData[a.name]?.[data.statToCompare] || 0) - (statsData[b.name]?.[data.statToCompare] || 0),
                        detail: player => {
                            const value = statsData[player.name]?.[data.statToCompare] || 0;
                            // Remove ${value} from the template or customize the display
                            return data.detailTemplate 
                                ? data.detailTemplate.replace('${value}', value.toString())
                                : value.toString();
                        }
                    };
                });
                setQuestions(questionsData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { players, playerStats, questions, loading, error };
};