export interface ApiPadding {
	hasNextPage: boolean;
	nextCursor: string | null;
}

export interface ApiResponse<T> {
	success: boolean;
	data: T;
	padding: ApiPadding;
}

export interface ApiError<T> {
	success: false;
	error: {
		code: T;
		message: string;
	};
}
