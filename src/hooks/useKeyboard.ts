import { useCallback, useEffect, useState } from "react"
import { Keyboard, KeyboardEvent } from "react-native"

export const useKeyboard = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0)

    useEffect(() => {
        const showingSubscription = Keyboard.addListener("keyboardDidShow", handleKeyboardShowing)
        const hidingSubscription = Keyboard.addListener("keyboardDidHide", handleKeyboardHiding)

        return () => {
            showingSubscription.remove()
            hidingSubscription.remove()
        }
    }, [])

    const handleKeyboardShowing = useCallback((event: KeyboardEvent) => {
        setKeyboardHeight(event.endCoordinates.height)
    }, [])

    const handleKeyboardHiding = useCallback(() => {
        setKeyboardHeight(0)
    }, [])

    return keyboardHeight
}