import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { createArticle, updateArticle, deleteArticle } from '@/app/actions/articles';
import db from '@/db/index';
import { articles } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import * as authz from '@/db/authz';
import redis from '@/cache';
import summarizeArticle from '@/ai/summarize';

// Mock dependencies
vi.mock('@/db/index');
vi.mock('@/stack/server');
vi.mock('@/db/authz');
vi.mock('@/cache');
vi.mock('@/ai/summarize');

describe('Article Actions', () => {
  const mockUser = { id: 'user-123', email: 'test@example.com' };

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mocks
    vi.mocked(stackServerApp.getUser).mockResolvedValue(mockUser);
    vi.mocked(summarizeArticle).mockResolvedValue('Test summary');
    vi.mocked(redis.del).mockResolvedValue(1);
  });

  describe('createArticle', () => {
    it('should create an article when user is authenticated', async () => {
      vi.mocked(db.insert).mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([{ id: 1 }])
        })
      } as any);

      const articleData = {
        title: 'Test Article',
        content: 'Test content',
        authorId: mockUser.id,
        imageUrl: 'https://example.com/image.jpg'
      };

      const result = await createArticle(articleData);

      expect(result).toEqual({
        success: true,
        message: 'Article create logged',
        id: 1
      });
      expect(db.insert).toHaveBeenCalledWith(articles);
      expect(redis.del).toHaveBeenCalledWith('articles:all');
    });

    it('should throw error when user is not authenticated', async () => {
      vi.mocked(stackServerApp.getUser).mockResolvedValue(null);

      const articleData = {
        title: 'Test Article',
        content: 'Test content',
        authorId: 'user-123',
      };

      await expect(createArticle(articleData)).rejects.toThrow('Unauthorized');
      expect(db.insert).not.toHaveBeenCalled();
    });

    it('should handle article creation without optional imageUrl', async () => {
      vi.mocked(db.insert).mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([{ id: 1 }])
        })
      } as any);

      const articleData = {
        title: 'Test Article',
        content: 'Test content',
        authorId: mockUser.id,
      };

      const result = await createArticle(articleData);

      expect(result).toEqual({
        success: true,
        message: 'Article create logged',
        id: 1
      });
      expect(db.insert).toHaveBeenCalledWith(articles);
    });
  });

  describe('updateArticle', () => {
    beforeEach(() => {
      vi.mocked(authz.authorizeUserToEditArticle).mockResolvedValue(true);
    });

    it('should update an article when user is authorized', async () => {
      const mockUpdate = vi.fn().mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue({ id: 1 })
        })
      });
      vi.mocked(db.update).mockReturnValue({
        set: mockUpdate.mockReturnValue({
          where: vi.fn().mockResolvedValue({ id: 1 })
        })
      } as any);

      const updateData = {
        title: 'Updated Title',
        content: 'Updated content',
        imageUrl: 'https://example.com/new-image.jpg'
      };

      const result = await updateArticle('1', updateData);

      expect(result).toEqual({
        success: true,
        message: 'Article 1 update logged'
      });
      expect(authz.authorizeUserToEditArticle).toHaveBeenCalledWith(mockUser.id, 1);
      expect(db.update).toHaveBeenCalledWith(articles);
    });

    it('should throw error when user is not authenticated', async () => {
      vi.mocked(stackServerApp.getUser).mockResolvedValue(null);

      await expect(updateArticle('1', { title: 'New Title' }))
        .rejects.toThrow('Unauthorized');
      expect(db.update).not.toHaveBeenCalled();
    });

    it('should throw error when user is not authorized to edit', async () => {
      vi.mocked(authz.authorizeUserToEditArticle).mockResolvedValue(false);

      await expect(updateArticle('1', { title: 'New Title' }))
        .rejects.toThrow('Forbidden');
      expect(db.update).not.toHaveBeenCalled();
    });
  });

  describe('deleteArticle', () => {
    beforeEach(() => {
      vi.mocked(authz.authorizeUserToEditArticle).mockResolvedValue(true);
    });

    it('should delete an article when user is authorized', async () => {
      const mockDelete = vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue({ id: 1 })
      });
      vi.mocked(db.delete).mockReturnValue({
        where: mockDelete
      } as any);

      const result = await deleteArticle('1');

      expect(result).toEqual({
        success: true,
        message: 'Article 1 delete logged (stub)'
      });
      expect(authz.authorizeUserToEditArticle).toHaveBeenCalledWith(mockUser.id, 1);
      expect(db.delete).toHaveBeenCalledWith(articles);
    });

    it('should throw error when user is not authenticated', async () => {
      vi.mocked(stackServerApp.getUser).mockResolvedValue(null);

      await expect(deleteArticle('1')).rejects.toThrow('Unauthorized');
      expect(db.delete).not.toHaveBeenCalled();
    });

    it('should throw error when user is not authorized to delete', async () => {
      vi.mocked(authz.authorizeUserToEditArticle).mockResolvedValue(false);

      await expect(deleteArticle('1')).rejects.toThrow('Forbidden');
      expect(db.delete).not.toHaveBeenCalled();
    });
  });
});