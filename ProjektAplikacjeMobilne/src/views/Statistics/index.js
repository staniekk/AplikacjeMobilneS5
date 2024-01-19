import { Text,ScrollView, BackHandler, View, Image } from "react-native";
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

        axios.get('http://192.168.221.140:3000/history')
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

      function formatNumber(val, n) {
            if (typeof val !== 'undefined' && typeof val === 'number' && !isNaN(val)) {
                const fixedValue = val.toFixed(n);
                return parseFloat(fixedValue).toString();
            } else {
                return '...';
            }
        }

      return (

      <View style={{ backgroundColor: '#11B5E4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={styles.logo}
                            source={require('../../img/logo/Logo.png')}
                        />

          <ScrollView style={styles.mainContainer}
                  keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{
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
                    <Text style={styles.statsRight}>{formatNumber(totalDist, 3)} km</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Time spent:</Text>
                    <Text style={styles.statsRight}>{formatNumber(totalTime, 2)} hr(s)</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. speed:</Text>
                    <Text style={styles.statsRight}>{formatNumber(avgSpeed, 2)} km/h</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. time:</Text>
                    <Text style={styles.statsRight}>{formatNumber(avgTime, 2)} hr(s)</Text>
                </View>
            </View>

            <View style={styles.panel}>
                <Text>Personal Bests</Text>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Most steps:</Text>
                    <Text style={styles.statsRight}>{bestSteps}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Highest avg. speed:</Text>
                    <Text style={styles.statsRight}>{formatNumber(bestSpeed, 2)} km/h</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Longest distance:</Text>
                    <Text style={styles.statsRight}>{formatNumber(bestDist, 3)} km</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Longest time:</Text>
                    <Text style={styles.statsRight}>{formatNumber(bestTime, 2)} hr(s)</Text>
                </View>
            </View>

            {/* Tu muszę umieścić jeszcze wykres (jakiś?) */}

          </ScrollView>
          </View>
        );
}