import { useState } from "react"

const useConfirmControll = (cb: () => Promise<void> | void) => {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const [promise, setPromise] = useState<{
        resolve: (value: unknown) => void,
        reject: (reason?: unknown) => void
    } | null>(null)

    const dialogProcess = () => new Promise((resolve, reject) => {
        setOpen(true)
        setPromise({ resolve, reject })
    })

    const trigger = async () => {
        try {
            await dialogProcess()
            setLoading(true)
            await cb()
        } catch {
        } finally {
            setLoading(false)
            setOpen(false)
            setPromise(null)
        }

    }

    return { controll: { promise, open, loading }, trigger }
}

export default useConfirmControll

