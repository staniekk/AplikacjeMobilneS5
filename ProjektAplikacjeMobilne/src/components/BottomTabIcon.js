import { StyleSheet, Image } from "react-native";

export const BottomTabIcon = ({ routeName, focused }) => {

    switch (routeName) {
        case 'HomeScreenTab':
            if (focused) {
                return <Image
                    style={styles.imgActive}
                    source={require('./../img/bottomNav/home_active.png')}
                />
            } else {
                return <Image
                    style={styles.img}
                    source={require('./../img/bottomNav/home_inactive.png')}
                />
            }
        case 'Map':
            if (focused) {
                return <Image
                    style={styles.imgActive}
                    source={require('./../img/bottomNav/map_active.png')}
                />
            } else {
                return <Image
                    style={styles.img}
                    source={require('./../img/bottomNav/map_inactive.png')}
                />
            }
        case 'Calendar':
            if (focused) {
                return <Image
                    style={styles.imgActive}
                    source={require('./../img/bottomNav/calendar_active.png')}
                />
            } else {
                return <Image
                    style={styles.img}
                    source={require('./../img/bottomNav/calendar_inactive.png')}
                />
            }
        default:
            return <Image
                style={styles.imgActive}
                source={require('./../img/bottomNav/home_active.png')}
            />
    }

}

const styles = StyleSheet.create({
    img: {
        width: 28,
        height: 28
    },
    imgActive: {
        width: 40,
        height: 40
    }
})
