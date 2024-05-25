import {fetchApi, getPdUrl} from '../request-helpers';
import {AxiosHeaders} from 'axios';
import {HttpMethod, Shard} from '../request-types';

async function store_fetchOffers(shard: Shard, headers: AxiosHeaders) {
    return fetchApi(`${getPdUrl(shard)}/store/v1/offers/`, HttpMethod.GET, null, headers);
}

async function store_fetchFrontV2(shard: Shard, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getPdUrl(shard)}/store/v2/storefront/${puuid}`, HttpMethod.GET, null, headers);
}

async function store_fetchWallet(shard: Shard, headers: AxiosHeaders, puuid: string) {
    return fetchApi(`${getPdUrl(shard)}/store/v1/wallet/${puuid}`, HttpMethod.GET, null, headers);
}

async function store_fetchOrder(shard: Shard, headers: AxiosHeaders, orderID: string) {
    return fetchApi(`${getPdUrl(shard)}/store/v1/order/${orderID}`, HttpMethod.GET, null, headers);
}

async function store_fetchEntitlements(shard: Shard, headers: AxiosHeaders, puuid: string, itemTypeID: string) {
    return fetchApi(`${getPdUrl(shard)}/store/v1/entitlements/${puuid}/${itemTypeID}`, HttpMethod.GET, null, headers);
}

export {store_fetchOffers, store_fetchFrontV2, store_fetchWallet, store_fetchOrder, store_fetchEntitlements};
