import React from 'react'
import { Link } from 'expo-router'
import { Pressable, View, Text, SafeAreaView } from 'react-native'
import { StyleSheet, UnistylesRuntime, withUnistyles } from 'react-native-unistyles'
// import { Pressable } from 'react-native-gesture-handler'

const ButtonBase = withUnistyles(Pressable)

const Button = ({ style, children, ...props }) => {
    return <Pressable {...props} style={[styles.button, style]}>{children}</Pressable>
}

const ButtonPreUnistyles = ({ style, children, ...props }) => {
    return <ButtonBase {...props} style={[styles.button, style]}>{children}</ButtonBase>
}

const ButtonUnistyles = withUnistyles(Button)
const ButtonUnistyles2 = withUnistyles(ButtonPreUnistyles)


export default function HomeScreen() {
    styles.useVariants({
        variant: 'blue'
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.test}>
                <Text style={styles.typography}>
                    Hello world!
                </Text>
                <Link href="/explore" asChild>
                    <Pressable style={StyleSheet.flatten([styles.button, styles.buttonCustom])}>
                        <Text style={styles.typography}>
                            Original
                        </Text>
                    </Pressable>
                </Link>
                <Button style={[styles.button, styles.buttonCustom]}>
                    <Text style={styles.typography}>
                        Pure
                    </Text>
                </Button>
                <ButtonUnistyles style={[styles.button, styles.buttonCustom]}>
                    <Text style={styles.typography}>
                        Wrapped with Unistyles
                    </Text>
                </ButtonUnistyles>
                <ButtonPreUnistyles style={[styles.button, styles.buttonCustom]}>
                    <Text style={styles.typography}>
                        Pressable wrapped with Unistyles
                    </Text>
                </ButtonPreUnistyles>
                <ButtonUnistyles2 style={[styles.button, styles.buttonCustom]}>
                    <Text style={styles.typography}>
                        Both wrapped
                    </Text>
                </ButtonUnistyles2>
                <Pressable onPress={() => UnistylesRuntime.getTheme()}>
                    <Text style={styles.typography}>
                        Press me
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create(theme => ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundColor,
        includeFontPadding: true
    },
    typography: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.typography
    },
    test: {
        width: '100%',
        variants: {
            variant: {
                red: {
                    backgroundColor: 'red'
                },
                blue: {
                    backgroundColor: 'blue'
                }
            }
        }
    },
    button: {
        backgroundColor: theme.colors.aloes,
        padding: 10,
        borderRadius: 8,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button2: {
        backgroundColor: theme.colors.blue,
        padding: 10,
        borderRadius: 8,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    buttonCustom: {
        padding: 10,
        backgroundColor: theme.colors.oak,
        borderRadius: 5,
        height: 100,
        alignItems: 'flex-end',
    }
}))
