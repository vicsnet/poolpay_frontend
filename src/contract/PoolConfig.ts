import PoolABI from './abi/PoolABI..json';
export const wagmiContractConfig = (address: string) => ({
    address,
    abi: PoolABI
} as const)