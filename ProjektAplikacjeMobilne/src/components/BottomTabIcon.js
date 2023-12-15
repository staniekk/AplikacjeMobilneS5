import {StyleSheet, Image} from "react-native";

export const BottomTabIcon = ({ routeName, focused }) => {

    switch (routeName) {
        case 'Login':
            if(focused) {
                return <Image
                    style={styles.imgActive}
                    source={require('./../img/bottomNav/profile_active.png')}
                />
            }else{
                return <Image
                    style={styles.img}
                    source={require('./../img/bottomNav/profile_inactive.png')}
                />
            }
        case 'Register':
            if(focused) {
                return <Image
                    style={styles.imgActive}
                    source={require('./../img/bottomNav/regD.png')}
                />
            }else{
                return <Image
                    style={styles.img}
                    source={require('./../img/bottomNav/reg.png')}
                />
            }
        case 'About':
            if(focused) {
                return <Image
                    style={styles.imgActive}
                    source={require('./../img/bottomNav/QuestionMarkD.png')}
                />
            }else{
                return <Image
                    style={styles.img}
                    source={require('./../img/bottomNav/QuestionMark.png')}
                />
            }
        default:
            return <Image
                style={styles.imgActive}
                source={require('./../img/bottomNav/profile_active.png')}
            />
    }

}

const styles = StyleSheet.create({
    img:{
        width: 28,
        height: 28
    },
    imgActive: {
        width: 40,
        height: 40
    }
})
