import { Text,ScrollView, BackHandler, View } from "react-native";
import { styles } from "./style";
import React from "react";
import axios from 'axios';




export function Statistics({ navigation }) {
    const [totalSteps, setTotalSteps] = React.useState('');
    const [totalDist, setTotalDist] = React.useState('');
    const [totalTime, setTotalTime] = React.useState('');
    const [avgSpeed, setAvgSpeed] = React.useState('');
    const [avgTime, setAvgTime] = React.useState('');

    const [bestSteps, setBestSteps] = React.useState('');
    const [bestSpeed, setBestSpeed] = React.useState('');
    const [bestDist, setBestDist] = React.useState('');
    const [bestTime, setBestTime] = React.useState('');

    React.useEffect(() => {
        const backAction = () => {
          return true;
        };

        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );

        axios.get('http://192.168.51.122:3004/history')
              .then(response => {
                    const stepsArray = response.data.map(item => item.steps);
                    const distArray = response.data.map(item => item.dist);
                    const timeArray = response.data.map(item => item.time);

                    const sumSteps = stepsArray.reduce((acc, steps) => acc + steps, 0);
                    const sumDist = distArray.reduce((acc, dist) => acc + dist, 0);
                    const sumTime = timeArray.reduce((acc, time) => acc + time, 0);

                    const aveSpeed = sumDist / sumTime;
                    const aveTime = sumTime / timeArray.length;

                    const maxSteps = Math.max(...response.data.map(item => item.steps));
                    const maxSpeed = Math.max(...response.data.map(item => item.speed));
                    const maxDist = Math.max(...response.data.map(item => item.dist));
                    const maxTime = Math.max(...response.data.map(item => item.time));

                    setTotalSteps(sumSteps);
                    setTotalDist(sumDist);
                    setTotalTime(sumTime);
                    setAvgSpeed(aveSpeed);
                    setAvgTime(aveTime);

                    setBestSteps(maxSteps);
                    setBestSpeed(maxSpeed);
                    setBestDist(maxDist);
                    setBestTime(maxTime);
              })
              .catch(error => console.error("Błąd podczas pobierania danych: ", error));

        return () => backHandler.remove();
      }, []);

      return (
          <ScrollView style={styles.mainContainer}
                  keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{
                      flexGrow: 1,
                      flex: 6,
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}>
            <View style={styles.panel}>
                <Text>Lifetime summary</Text>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Steps:</Text>
                    <Text style={styles.statsRight}>{totalSteps}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Distance:</Text>
                    <Text style={styles.statsRight}>{totalDist}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Time spent:</Text>
                    <Text style={styles.statsRight}>{totalTime}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. speed:</Text>
                    <Text style={styles.statsRight}>{avgSpeed}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. time:</Text>
                    <Text style={styles.statsRight}>{avgTime}</Text>
                </View>
            </View>

            <View style={styles.panel}>
                <Text>Personal Bests</Text>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Steps:</Text>
                    <Text style={styles.statsRight}>{bestSteps}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. speed:</Text>
                    <Text style={styles.statsRight}>{bestSpeed}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Longest distance:</Text>
                    <Text style={styles.statsRight}>{bestDist}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Longest time:</Text>
                    <Text style={styles.statsRight}>{bestTime}</Text>
                </View>
            </View>

            {/* Tu muszę umieścić jeszcze wykres (jakiś?) */}

          </ScrollView>
        );
}