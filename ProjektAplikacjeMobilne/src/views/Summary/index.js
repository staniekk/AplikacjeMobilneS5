import { Text,ScrollView, BackHandler, View } from "react-native";
import { styles } from "./style";
import React from "react";
import axios from 'axios';




export function Statistics({ navigation }) {
    const [lastRun, setLastRun] = React.useState('');

    React.useEffect(() => {
        const backAction = () => {
          return true;
        };

        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );

        axios.get('http://192.168.1.12:3000/history')
              .then(response => {
                   const data = response.data;

                    const latestData = data.reduce((latest, item) => (item.id > latest.id ? item : latest), { id: -1 });

                    setLastRun(latestData);
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
            <View style={styles.panel}
                <Text>Run's summary</Text>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Steps:<\Text>
                    <Text style={styles.statsRight}>{lastRun.steps}<\Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Distance:<\Text>
                    <Text style={styles.statsRight}>{lastRun.dist}<\Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Time spent:<\Text>
                    <Text style={styles.statsRight}>{lastRun.time}<\Text>
                </View>
                <View style={styles.stats}>
                    <Text style={styles.statsLeft}>Avg. speed:<\Text>
                    <Text style={styles.statsRight}>{lastRun.speed}<\Text>
                </View>
            </View>

          </ScrollView>
        );
}