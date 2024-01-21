import { Text,ScrollView, BackHandler, View, Image } from "react-native";
import { styles } from "./style";
import React from "react";
import axios from 'axios';




export function Summary({ navigation }) {
    const [lastRun, setLastRun] = React.useState('');

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
                   const data = response.data;

                    const latestData = data.reduce((latest, item) => (item.id > latest.id ? item : latest), { id: -1 });

                    setLastRun(latestData);
              })
              .catch(error => console.error("Błąd podczas pobierania danych: ", error));

        return () => backHandler.remove();
      }, []);

      return (
      <View style={{ backgroundColor: '#11B5E4', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                              <Image style={styles.logo}
                                  source={require('../../img/logo/Logo.png')}
                              />
          <ScrollView style={styles.mainContainer}
                  keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{
                      flexGrow: 2,
                      flex: 6,
                      alignItems: 'center',
                        justifyContent: 'center',
                  }}>
            <View style={styles.panel}>
                <Text style={styles.panelTitle}>Run's summary</Text>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Steps:</Text>
                    <Text style={styles.statsRight}>
                        <Text style={styles.statsData}>{lastRun.steps}</Text>
                    </Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Distance:</Text>
                    <Text style={styles.statsRight}>
                        <Text style={styles.statsData}>{lastRun.dist}</Text>
                        <Text style={styles.statsUnit}> km</Text>
                    </Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Time spent:</Text>
                    <Text style={styles.statsRight}>
                        <Text style={styles.statsData}>{lastRun.time}</Text>
                        <Text style={styles.statsUnit}> hr(s)</Text>
                    </Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. speed:</Text>
                    <Text style={styles.statsRight}>
                        <Text style={styles.statsData}>{lastRun.speed}</Text>
                        <Text style={styles.statsUnit}> km/h</Text>
                     </Text>
                </View>
            </View>

            {/* Tu muszę umieścić jeszcze mapkę (jakąś?) */}
            {/*
            <View style={styles.panel}>
                <Image style={styles.chart}
                  source={require('../../img/temp/exampleChart.png')}
                />
            </View>
            */}

          </ScrollView>
          </View>
        );
}