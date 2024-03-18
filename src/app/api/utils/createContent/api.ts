import React from 'react'
import { useQuery } from 'react-query'
import { getNewsApi } from '../../requests/getNewsApi'
import { getNytimes } from '../../requests/getNytimes'
import { getTheGuardian } from '../../requests/getTheGuardian'

const useContent = () => {
  const fetchNewsApi = useQuery('getNewsApiNews', getNewsApi)
  const fetchNytimes = useQuery('getNytimes', getNytimes)
  const fetchTheGuardian = useQuery('getTheGuardian', getTheGuardian)

  const combinedData = React.useMemo(() => {
    if (fetchNewsApi.isLoading || fetchNytimes.isLoading || fetchTheGuardian.isLoading) return []
    return [
      ...(fetchNewsApi.data || []),
      ...(fetchNytimes.data || []),
      ...(fetchTheGuardian.data || []),
    ]
  }, [fetchNewsApi.data, fetchNytimes.data, fetchTheGuardian.data])

  return {
    combinedData,
    isLoading: fetchNewsApi.isLoading || fetchNytimes.isLoading || fetchTheGuardian.isLoading,
    isError: fetchNewsApi.isError || fetchNytimes.isError || fetchTheGuardian.isError,
    error: fetchNewsApi.error || fetchNytimes.error || fetchTheGuardian.error,
  }
}

export default useContent
