import { Text,ScrollView, BackHandler, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import React, { useRef, useEffect, useState, useContext } from "react";
import axios from 'axios';
import { SettingsContext, useSettings } from "../../Context/settingsContext";




export function Statistics({ navigation }) {

    const {userID} = useContext(SettingsContext);
    const [data, setData] = React.useState([]);


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

        axios.get('https://65a40329a54d8e805ed451eb.mockapi.io/api/am/history')
              .then(response => {
                    const readData = response.data;
                    const filteredData = readData.filter(item => item.userID === userID);

                    const stepsArray = filteredData.map(item => item.steps);
                    const distArray = filteredData.map(item => item.dist);
                    const timeArray = filteredData.map(item => item.time);

                    const sumSteps = stepsArray.reduce((acc, steps) => acc + steps, 0);
                    var sumDist = distArray.reduce((acc, dist) => acc + dist, 0);
                    sumDist = sumDist/1000;
                    var sumTime = timeArray.reduce((acc, time) => acc + time, 0);
                    sumTime = sumTime / 3600;

                    const aveSpeed = sumDist / sumTime;
                    const aveTime = sumTime / timeArray.length;

                    const maxSteps = Math.max(...filteredData.map(item => item.steps));
                    const maxSpeed = (Math.max(...filteredData.map(item => item.speed))) * 3.6;
                    const maxDist = (Math.max(...filteredData.map(item => item.dist))) / 1000;
                    const maxTime = (Math.max(...filteredData.map(item => item.time))) / 3600;

                    setTotalSteps(sumSteps);
                    setTotalDist(sumDist);
                    setTotalTime(sumTime);
                    setAvgSpeed(aveSpeed);
                    setAvgTime(aveTime);

                    setBestSteps(maxSteps);
                    setBestSpeed(maxSpeed);
                    setBestDist(maxDist);
                    setBestTime(maxTime);


                    setData(filteredData);
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
                      <Text style={styles.panelTitle}>Lifetime summary</Text>


                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Steps:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{totalSteps}</Text>
                          </Text>
                      </View>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Distance:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{formatNumber(totalDist, 3)}</Text>
                              <Text style={styles.statsUnit}> km</Text>
                          </Text>
                      </View>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Time spent:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{formatNumber(totalTime, 2)}</Text>
                              <Text style={styles.statsUnit}> hr(s)</Text>
                          </Text>
                      </View>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Avg. speed:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{formatNumber(avgSpeed, 2)}</Text>
                              <Text style={styles.statsUnit}> km/h</Text>
                          </Text>
                      </View>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Avg. time:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{formatNumber(avgTime, 2)}</Text>
                              <Text style={styles.statsUnit}> hr(s)</Text>
                           </Text>
                      </View>
                  </View>

                  <View style={styles.panel}>
                      <Text style={styles.panelTitle}>Personal Bests</Text>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Most steps:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{bestSteps}</Text>
                          </Text>
                      </View>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Highest avg. speed:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{formatNumber(bestSpeed, 2)}</Text>
                              <Text style={styles.statsUnit}> km/h</Text>
                           </Text>
                      </View>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Longest distance:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{formatNumber(bestDist, 3)}</Text>
                              <Text style={styles.statsUnit}> km</Text>
                           </Text>
                      </View>
                      <View style={styles.stats}>
                          <Text style={styles.statsLeft}>Longest time:</Text>
                          <Text style={styles.statsRight}>
                              <Text style={styles.statsData}>{formatNumber(bestTime, 2)}</Text>
                              <Text style={styles.statsUnit}> hr(s)</Text>
                           </Text>
                      </View>
                  </View>


                </ScrollView>
                </View>
              );
      }