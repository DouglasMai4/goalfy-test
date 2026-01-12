CREATE TABLE `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`cnpj` text NOT NULL,
	`zip_code` text NOT NULL,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000),
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
