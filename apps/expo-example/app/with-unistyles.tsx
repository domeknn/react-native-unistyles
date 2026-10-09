import React, { useState } from 'react'
import { ActivityIndicator, Text, View, TextInput as RNTextInput } from 'react-native'
import { Pressable as GesturePressable, TextInput } from 'react-native-gesture-handler'
import { StyleSheet, useUnistyles, withUnistyles } from 'react-native-unistyles'
import { Screen, Section } from '../components'
import { useE2EAction } from '../e2e/actions'

const UniGesturePressable = withUnistyles(GesturePressable)
const UniActivityIndicator = withUnistyles(ActivityIndicator, theme => ({
    color: theme.colors.accent
}))
const UniTextInput = withUnistyles(TextInput)

const HookDriven: React.FunctionComponent<{ isActive: boolean }> = ({ isActive }) => {
    const { theme, rt } = useUnistyles()

    return (
        <View style={styles.hook(isActive)}>
            <Text style={{ color: theme.colors.typography }}>
                {`useUnistyles: ${rt.themeName}, accent ${theme.colors.accent}`}
            </Text>
        </View>
    )
}

const style = [
    { color: '#000000' },
    [
      { minWidth: 200, flex: 1, paddingBottom: 2, paddingTop: 0 },
      { fontFamily: 'System', fontWeight: '400', fontSize: 17, lineHeight: 22 },
    ],
];

export default function WithUnistylesScreen() {
    const [isActive, setIsActive] = useState(false)

    useE2EAction('with-unistyles.toggle', () => setIsActive(value => !value))

    return (
        <Screen>
            <Section title="withUnistyles" description="Gesture handler Pressable and ActivityIndicator with mapped props">
                <UniGesturePressable style={styles.gesturePressable(isActive)} onPress={() => setIsActive(value => !value)}>
                    <Text style={styles.text}>Gesture handler Pressable</Text>
                </UniGesturePressable>
                <UniActivityIndicator animating={false} hidesWhenStopped={false} />
            </Section>
            <Section title="useUnistyles" description="Inline styles from the hook, re-rendered on theme change">
                <HookDriven isActive={isActive} />
            </Section>
            <Section title="input component" description="Input component with mapped props">
            <TextInput placeholder='TextInput' style={style} />
            <TextInput placeholder='TextInput' style={[style, { color: 'red' }]} />
            <RNTextInput placeholder='RNTextInput' style={style} />
            <RNTextInput placeholder='RNTextInput' style={[style, { color: 'red' }]} />
            <UniTextInput placeholder='UniTextInput' style={style} />
            <UniTextInput placeholder='UniTextInput' style={[style, { color: 'red' }]} />
            </Section>
        </Screen>
    )
}

const styles = StyleSheet.create(theme => ({
    gesturePressable: (isActive: boolean) => ({
        padding: theme.gap(1.5),
        borderRadius: 8,
        backgroundColor: isActive ? theme.colors.accent : theme.colors.primary
    }),
    text: {
        color: theme.colors.chip.onFill
    },
    hook: (isActive: boolean) => ({
        padding: theme.gap(1.5),
        borderRadius: 8,
        borderWidth: 2,
        borderColor: isActive ? theme.colors.accent : theme.colors.border
    })
}))
