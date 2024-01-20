import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { styles } from "./style";

const Goal = 8000; // Przykładowy dzienny cel kroków

export default function StepCounter() {
    const [currentStepCount, setCurrentStepCount] = useState(0);

    useEffect(() => {
        subscribe();
        return () => unsubscribe();
    }, []);

    const subscribe = () => {
        Pedometer.watchStepCount(result => {
            setCurrentStepCount(result.steps);
        });

        Pedometer.isAvailableAsync().then(
            available => {
                if (!available) {
                    // Jeśli pedometer nie jest dostępny, poinformuj użytkownika
                    console.warn('Pedometer is not available on this device');
                }
            },
            error => {
                console.warn('There was an error getting the pedometer', error);
            }
        );
    };

    const unsubscribe = () => {
        Pedometer.watchStepCount().remove();
    };

    // Procent ukończenia celu
    const progress = Math.min(currentStepCount / Goal, 1);

    return (
        <View style={styles.container}>
            <Text style={styles.stepsCount}>{currentStepCount}</Text>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.goalText}>{Goal}</Text>
        </View>
    );
}

