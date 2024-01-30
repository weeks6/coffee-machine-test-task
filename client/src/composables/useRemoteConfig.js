import { onMounted, ref } from 'vue'
import getRemoteConfig from '../api/get-remote-config'

const useRemoteConfig = () => {
    const isLoading = ref(false)
    const isError = ref(false)
    const data = ref(null)

    onMounted(async () => {
        try {
            isLoading.value = true;
            const response = await getRemoteConfig();
            data.value = response
        } catch (error) {
            console.log(error);
            isError.value = true;
        } finally {
            isLoading.value = false;
        }
    })

    return {
        isLoading,
        isError,
        data
    }
}

export default useRemoteConfig