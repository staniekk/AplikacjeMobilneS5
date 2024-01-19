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

        axios.get('http://192.168.221.140:3000/history')
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
                  }}>
            <View style={styles.panel}>
                <Text>Runs summary</Text>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Steps:</Text>
                    <Text style={styles.statsRight}>{lastRun.steps}</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Distance:</Text>
                    <Text style={styles.statsRight}>{lastRun.dist} km</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Time spent:</Text>
                    <Text style={styles.statsRight}>{lastRun.time} hr(s)</Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. speed:</Text>
                    <Text style={styles.statsRight}>{lastRun.speed} km/h</Text>
                </View>
            </View>

          </ScrollView>
          </View>
        );
}