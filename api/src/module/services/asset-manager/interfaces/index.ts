export interface IUploaderResult {
  public_id: string;
  version: string;
  width: number;
  height: number;
  format: string;
  created_at: Date;
  resource_type: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  signature: string;
  original_filename: string;
}
