import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../styles/Colours';

function ThemeButton({ children, onPress, position, theme }) {
    return (
        <View style={styles.header}>
            {position === 'left' &&
                <TouchableOpacity
                    style={[styles.buttonL, theme === 'dark' && styles.activeBtn]}
                    onPress={onPress}
                >
                    <View>
                        <Text style={[styles.btntext, theme === 'dark' && styles.activeText]}>{children}</Text>
                    </View>
                </TouchableOpacity>
            }
            {position === 'right' &&
                <TouchableOpacity
                    style={[styles.buttonR, theme === 'light' && styles.activeBtn]}
                    onPress={onPress}
                >
                    <View>
                        <Text style={[styles.btntext, theme === 'light' && styles.activeText]}>{children}</Text>
                    </View>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        marginTop: 50,
    },
    buttonL: {
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
        padding: 10,
        marginLeft: 20,
        borderColor: GlobalStyles.colours.gray900,
        backgroundColor: GlobalStyles.colours.gray200,
        borderWidth: 1,
    },
    buttonR: {
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        padding: 10,
        marginRight: 20,
        borderColor: GlobalStyles.colours.gray900,
        backgroundColor: GlobalStyles.colours.gray200,
        borderWidth: 1,
    },
    btntext:{
        textAlign: 'center',
        color: GlobalStyles.colours.gray700,
    },
    activeBtn: {
        backgroundColor: GlobalStyles.colours.gray700,
    },
    activeText: {
        color: GlobalStyles.colours.gray200,
    },
});

export default ThemeButton;
