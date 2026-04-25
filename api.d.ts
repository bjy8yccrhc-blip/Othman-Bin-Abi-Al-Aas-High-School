import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { AboutContent, AboutContentInput, Activity, ActivityInput, CategoryCount, HealthStatus, ListResourcesParams, MeInfo, NewspaperArticle, NewspaperArticleInput, RecentItem, Resource, ResourceInput, SiteStats } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get current user info and role
 */
export declare const getGetMeUrl: () => string;
export declare const getMe: (options?: RequestInit) => Promise<MeInfo>;
export declare const getGetMeQueryKey: () => readonly ["/api/me"];
export declare const getGetMeQueryOptions: <TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMeQueryResult = NonNullable<Awaited<ReturnType<typeof getMe>>>;
export type GetMeQueryError = ErrorType<void>;
/**
 * @summary Get current user info and role
 */
export declare function useGetMe<TData = Awaited<ReturnType<typeof getMe>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMe>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get website summary stats
 */
export declare const getGetStatsUrl: () => string;
export declare const getStats: (options?: RequestInit) => Promise<SiteStats>;
export declare const getGetStatsQueryKey: () => readonly ["/api/stats"];
export declare const getGetStatsQueryOptions: <TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getStats>>>;
export type GetStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get website summary stats
 */
export declare function useGetStats<TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get the most recent items across the site
 */
export declare const getGetRecentActivityUrl: () => string;
export declare const getRecentActivity: (options?: RequestInit) => Promise<RecentItem[]>;
export declare const getGetRecentActivityQueryKey: () => readonly ["/api/recent-activity"];
export declare const getGetRecentActivityQueryOptions: <TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetRecentActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getRecentActivity>>>;
export type GetRecentActivityQueryError = ErrorType<unknown>;
/**
 * @summary Get the most recent items across the site
 */
export declare function useGetRecentActivity<TData = Awaited<ReturnType<typeof getRecentActivity>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getRecentActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all educational resources
 */
export declare const getListResourcesUrl: (params?: ListResourcesParams) => string;
export declare const listResources: (params?: ListResourcesParams, options?: RequestInit) => Promise<Resource[]>;
export declare const getListResourcesQueryKey: (params?: ListResourcesParams) => readonly ["/api/resources", ...ListResourcesParams[]];
export declare const getListResourcesQueryOptions: <TData = Awaited<ReturnType<typeof listResources>>, TError = ErrorType<unknown>>(params?: ListResourcesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listResources>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listResources>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListResourcesQueryResult = NonNullable<Awaited<ReturnType<typeof listResources>>>;
export type ListResourcesQueryError = ErrorType<unknown>;
/**
 * @summary List all educational resources
 */
export declare function useListResources<TData = Awaited<ReturnType<typeof listResources>>, TError = ErrorType<unknown>>(params?: ListResourcesParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listResources>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new resource (admin only)
 */
export declare const getCreateResourceUrl: () => string;
export declare const createResource: (resourceInput: ResourceInput, options?: RequestInit) => Promise<Resource>;
export declare const getCreateResourceMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createResource>>, TError, {
        data: BodyType<ResourceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createResource>>, TError, {
    data: BodyType<ResourceInput>;
}, TContext>;
export type CreateResourceMutationResult = NonNullable<Awaited<ReturnType<typeof createResource>>>;
export type CreateResourceMutationBody = BodyType<ResourceInput>;
export type CreateResourceMutationError = ErrorType<void>;
/**
 * @summary Create a new resource (admin only)
 */
export declare const useCreateResource: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createResource>>, TError, {
        data: BodyType<ResourceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createResource>>, TError, {
    data: BodyType<ResourceInput>;
}, TContext>;
/**
 * @summary List distinct resource categories with counts
 */
export declare const getListResourceCategoriesUrl: () => string;
export declare const listResourceCategories: (options?: RequestInit) => Promise<CategoryCount[]>;
export declare const getListResourceCategoriesQueryKey: () => readonly ["/api/resources/categories"];
export declare const getListResourceCategoriesQueryOptions: <TData = Awaited<ReturnType<typeof listResourceCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listResourceCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listResourceCategories>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListResourceCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof listResourceCategories>>>;
export type ListResourceCategoriesQueryError = ErrorType<unknown>;
/**
 * @summary List distinct resource categories with counts
 */
export declare function useListResourceCategories<TData = Awaited<ReturnType<typeof listResourceCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listResourceCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get a single resource
 */
export declare const getGetResourceUrl: (id: number) => string;
export declare const getResource: (id: number, options?: RequestInit) => Promise<Resource>;
export declare const getGetResourceQueryKey: (id: number) => readonly [`/api/resources/${number}`];
export declare const getGetResourceQueryOptions: <TData = Awaited<ReturnType<typeof getResource>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getResource>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getResource>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetResourceQueryResult = NonNullable<Awaited<ReturnType<typeof getResource>>>;
export type GetResourceQueryError = ErrorType<void>;
/**
 * @summary Get a single resource
 */
export declare function useGetResource<TData = Awaited<ReturnType<typeof getResource>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getResource>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a resource (admin only)
 */
export declare const getUpdateResourceUrl: (id: number) => string;
export declare const updateResource: (id: number, resourceInput: ResourceInput, options?: RequestInit) => Promise<Resource>;
export declare const getUpdateResourceMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateResource>>, TError, {
        id: number;
        data: BodyType<ResourceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateResource>>, TError, {
    id: number;
    data: BodyType<ResourceInput>;
}, TContext>;
export type UpdateResourceMutationResult = NonNullable<Awaited<ReturnType<typeof updateResource>>>;
export type UpdateResourceMutationBody = BodyType<ResourceInput>;
export type UpdateResourceMutationError = ErrorType<void>;
/**
 * @summary Update a resource (admin only)
 */
export declare const useUpdateResource: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateResource>>, TError, {
        id: number;
        data: BodyType<ResourceInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateResource>>, TError, {
    id: number;
    data: BodyType<ResourceInput>;
}, TContext>;
/**
 * @summary Delete a resource (admin only)
 */
export declare const getDeleteResourceUrl: (id: number) => string;
export declare const deleteResource: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteResourceMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteResource>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteResource>>, TError, {
    id: number;
}, TContext>;
export type DeleteResourceMutationResult = NonNullable<Awaited<ReturnType<typeof deleteResource>>>;
export type DeleteResourceMutationError = ErrorType<void>;
/**
 * @summary Delete a resource (admin only)
 */
export declare const useDeleteResource: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteResource>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteResource>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List all newspaper articles (newest first)
 */
export declare const getListNewspaperArticlesUrl: () => string;
export declare const listNewspaperArticles: (options?: RequestInit) => Promise<NewspaperArticle[]>;
export declare const getListNewspaperArticlesQueryKey: () => readonly ["/api/newspaper"];
export declare const getListNewspaperArticlesQueryOptions: <TData = Awaited<ReturnType<typeof listNewspaperArticles>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNewspaperArticles>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listNewspaperArticles>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListNewspaperArticlesQueryResult = NonNullable<Awaited<ReturnType<typeof listNewspaperArticles>>>;
export type ListNewspaperArticlesQueryError = ErrorType<unknown>;
/**
 * @summary List all newspaper articles (newest first)
 */
export declare function useListNewspaperArticles<TData = Awaited<ReturnType<typeof listNewspaperArticles>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listNewspaperArticles>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a newspaper article (admin only)
 */
export declare const getCreateNewspaperArticleUrl: () => string;
export declare const createNewspaperArticle: (newspaperArticleInput: NewspaperArticleInput, options?: RequestInit) => Promise<NewspaperArticle>;
export declare const getCreateNewspaperArticleMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createNewspaperArticle>>, TError, {
        data: BodyType<NewspaperArticleInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createNewspaperArticle>>, TError, {
    data: BodyType<NewspaperArticleInput>;
}, TContext>;
export type CreateNewspaperArticleMutationResult = NonNullable<Awaited<ReturnType<typeof createNewspaperArticle>>>;
export type CreateNewspaperArticleMutationBody = BodyType<NewspaperArticleInput>;
export type CreateNewspaperArticleMutationError = ErrorType<void>;
/**
 * @summary Create a newspaper article (admin only)
 */
export declare const useCreateNewspaperArticle: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createNewspaperArticle>>, TError, {
        data: BodyType<NewspaperArticleInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createNewspaperArticle>>, TError, {
    data: BodyType<NewspaperArticleInput>;
}, TContext>;
/**
 * @summary Get a single newspaper article
 */
export declare const getGetNewspaperArticleUrl: (id: number) => string;
export declare const getNewspaperArticle: (id: number, options?: RequestInit) => Promise<NewspaperArticle>;
export declare const getGetNewspaperArticleQueryKey: (id: number) => readonly [`/api/newspaper/${number}`];
export declare const getGetNewspaperArticleQueryOptions: <TData = Awaited<ReturnType<typeof getNewspaperArticle>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getNewspaperArticle>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getNewspaperArticle>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetNewspaperArticleQueryResult = NonNullable<Awaited<ReturnType<typeof getNewspaperArticle>>>;
export type GetNewspaperArticleQueryError = ErrorType<void>;
/**
 * @summary Get a single newspaper article
 */
export declare function useGetNewspaperArticle<TData = Awaited<ReturnType<typeof getNewspaperArticle>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getNewspaperArticle>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update an article (admin only)
 */
export declare const getUpdateNewspaperArticleUrl: (id: number) => string;
export declare const updateNewspaperArticle: (id: number, newspaperArticleInput: NewspaperArticleInput, options?: RequestInit) => Promise<NewspaperArticle>;
export declare const getUpdateNewspaperArticleMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateNewspaperArticle>>, TError, {
        id: number;
        data: BodyType<NewspaperArticleInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateNewspaperArticle>>, TError, {
    id: number;
    data: BodyType<NewspaperArticleInput>;
}, TContext>;
export type UpdateNewspaperArticleMutationResult = NonNullable<Awaited<ReturnType<typeof updateNewspaperArticle>>>;
export type UpdateNewspaperArticleMutationBody = BodyType<NewspaperArticleInput>;
export type UpdateNewspaperArticleMutationError = ErrorType<void>;
/**
 * @summary Update an article (admin only)
 */
export declare const useUpdateNewspaperArticle: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateNewspaperArticle>>, TError, {
        id: number;
        data: BodyType<NewspaperArticleInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateNewspaperArticle>>, TError, {
    id: number;
    data: BodyType<NewspaperArticleInput>;
}, TContext>;
/**
 * @summary Delete an article (admin only)
 */
export declare const getDeleteNewspaperArticleUrl: (id: number) => string;
export declare const deleteNewspaperArticle: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteNewspaperArticleMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteNewspaperArticle>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteNewspaperArticle>>, TError, {
    id: number;
}, TContext>;
export type DeleteNewspaperArticleMutationResult = NonNullable<Awaited<ReturnType<typeof deleteNewspaperArticle>>>;
export type DeleteNewspaperArticleMutationError = ErrorType<void>;
/**
 * @summary Delete an article (admin only)
 */
export declare const useDeleteNewspaperArticle: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteNewspaperArticle>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteNewspaperArticle>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List all school activities (newest first)
 */
export declare const getListActivitiesUrl: () => string;
export declare const listActivities: (options?: RequestInit) => Promise<Activity[]>;
export declare const getListActivitiesQueryKey: () => readonly ["/api/activities"];
export declare const getListActivitiesQueryOptions: <TData = Awaited<ReturnType<typeof listActivities>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listActivities>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listActivities>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListActivitiesQueryResult = NonNullable<Awaited<ReturnType<typeof listActivities>>>;
export type ListActivitiesQueryError = ErrorType<unknown>;
/**
 * @summary List all school activities (newest first)
 */
export declare function useListActivities<TData = Awaited<ReturnType<typeof listActivities>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listActivities>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create an activity (admin only)
 */
export declare const getCreateActivityUrl: () => string;
export declare const createActivity: (activityInput: ActivityInput, options?: RequestInit) => Promise<Activity>;
export declare const getCreateActivityMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createActivity>>, TError, {
        data: BodyType<ActivityInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createActivity>>, TError, {
    data: BodyType<ActivityInput>;
}, TContext>;
export type CreateActivityMutationResult = NonNullable<Awaited<ReturnType<typeof createActivity>>>;
export type CreateActivityMutationBody = BodyType<ActivityInput>;
export type CreateActivityMutationError = ErrorType<void>;
/**
 * @summary Create an activity (admin only)
 */
export declare const useCreateActivity: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createActivity>>, TError, {
        data: BodyType<ActivityInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createActivity>>, TError, {
    data: BodyType<ActivityInput>;
}, TContext>;
/**
 * @summary List upcoming activities (date >= today)
 */
export declare const getListUpcomingActivitiesUrl: () => string;
export declare const listUpcomingActivities: (options?: RequestInit) => Promise<Activity[]>;
export declare const getListUpcomingActivitiesQueryKey: () => readonly ["/api/activities/upcoming"];
export declare const getListUpcomingActivitiesQueryOptions: <TData = Awaited<ReturnType<typeof listUpcomingActivities>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listUpcomingActivities>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listUpcomingActivities>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListUpcomingActivitiesQueryResult = NonNullable<Awaited<ReturnType<typeof listUpcomingActivities>>>;
export type ListUpcomingActivitiesQueryError = ErrorType<unknown>;
/**
 * @summary List upcoming activities (date >= today)
 */
export declare function useListUpcomingActivities<TData = Awaited<ReturnType<typeof listUpcomingActivities>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listUpcomingActivities>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get a single activity
 */
export declare const getGetActivityUrl: (id: number) => string;
export declare const getActivity: (id: number, options?: RequestInit) => Promise<Activity>;
export declare const getGetActivityQueryKey: (id: number) => readonly [`/api/activities/${number}`];
export declare const getGetActivityQueryOptions: <TData = Awaited<ReturnType<typeof getActivity>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getActivity>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetActivityQueryResult = NonNullable<Awaited<ReturnType<typeof getActivity>>>;
export type GetActivityQueryError = ErrorType<void>;
/**
 * @summary Get a single activity
 */
export declare function useGetActivity<TData = Awaited<ReturnType<typeof getActivity>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getActivity>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update an activity (admin only)
 */
export declare const getUpdateActivityUrl: (id: number) => string;
export declare const updateActivity: (id: number, activityInput: ActivityInput, options?: RequestInit) => Promise<Activity>;
export declare const getUpdateActivityMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateActivity>>, TError, {
        id: number;
        data: BodyType<ActivityInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateActivity>>, TError, {
    id: number;
    data: BodyType<ActivityInput>;
}, TContext>;
export type UpdateActivityMutationResult = NonNullable<Awaited<ReturnType<typeof updateActivity>>>;
export type UpdateActivityMutationBody = BodyType<ActivityInput>;
export type UpdateActivityMutationError = ErrorType<void>;
/**
 * @summary Update an activity (admin only)
 */
export declare const useUpdateActivity: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateActivity>>, TError, {
        id: number;
        data: BodyType<ActivityInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateActivity>>, TError, {
    id: number;
    data: BodyType<ActivityInput>;
}, TContext>;
/**
 * @summary Delete an activity (admin only)
 */
export declare const getDeleteActivityUrl: (id: number) => string;
export declare const deleteActivity: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteActivityMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteActivity>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteActivity>>, TError, {
    id: number;
}, TContext>;
export type DeleteActivityMutationResult = NonNullable<Awaited<ReturnType<typeof deleteActivity>>>;
export type DeleteActivityMutationError = ErrorType<void>;
/**
 * @summary Delete an activity (admin only)
 */
export declare const useDeleteActivity: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteActivity>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteActivity>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get about-school content (singleton)
 */
export declare const getGetAboutUrl: () => string;
export declare const getAbout: (options?: RequestInit) => Promise<AboutContent>;
export declare const getGetAboutQueryKey: () => readonly ["/api/about"];
export declare const getGetAboutQueryOptions: <TData = Awaited<ReturnType<typeof getAbout>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAbout>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAbout>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAboutQueryResult = NonNullable<Awaited<ReturnType<typeof getAbout>>>;
export type GetAboutQueryError = ErrorType<unknown>;
/**
 * @summary Get about-school content (singleton)
 */
export declare function useGetAbout<TData = Awaited<ReturnType<typeof getAbout>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAbout>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update about-school content (admin only)
 */
export declare const getUpdateAboutUrl: () => string;
export declare const updateAbout: (aboutContentInput: AboutContentInput, options?: RequestInit) => Promise<AboutContent>;
export declare const getUpdateAboutMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAbout>>, TError, {
        data: BodyType<AboutContentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateAbout>>, TError, {
    data: BodyType<AboutContentInput>;
}, TContext>;
export type UpdateAboutMutationResult = NonNullable<Awaited<ReturnType<typeof updateAbout>>>;
export type UpdateAboutMutationBody = BodyType<AboutContentInput>;
export type UpdateAboutMutationError = ErrorType<void>;
/**
 * @summary Update about-school content (admin only)
 */
export declare const useUpdateAbout: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAbout>>, TError, {
        data: BodyType<AboutContentInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateAbout>>, TError, {
    data: BodyType<AboutContentInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map