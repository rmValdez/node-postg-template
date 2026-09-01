import { PrismaClient, AngularCategory } from '@prisma/client';

export async function seedAngularTopics(prisma: PrismaClient) {
  console.log('🌱 Seeding Angular Learning Topics...');

  const topics = [
    {
      title: 'Angular 19 Signals & Computed Values',
      slug: 'signals-and-computed',
      category: AngularCategory.SIGNALS,
      difficulty: 'beginner',
      description: 'Learn how signal(), computed(), and effect() replace RxJS boilerplate in UI state management.',
      codeSnippet: `const count = signal(0);\nconst double = computed(() => count() * 2);\ncount.update(c => c + 1);`,
      likesCount: 24,
      isCompleted: true,
    },
    {
      title: 'Modern Control Flow (@if, @for, @switch)',
      slug: 'modern-control-flow',
      category: AngularCategory.CONTROL_FLOW,
      difficulty: 'beginner',
      description: 'Master Angular 19 built-in template syntax with mandatory track expressions and @empty blocks.',
      codeSnippet: `@for (item of items(); track item.id) {\n  <div>{{ item.title }}</div>\n} @empty {\n  <p>No items found.</p>\n}`,
      likesCount: 19,
      isCompleted: true,
    },
    {
      title: 'Functional Dependency Injection with inject()',
      slug: 'functional-inject-api',
      category: AngularCategory.SERVICES,
      difficulty: 'intermediate',
      description: 'Clean service and token injection without cumbersome constructor parameter lists.',
      codeSnippet: `export class UserProfileComponent {\n  private readonly auth = inject(AuthService);\n  readonly user = this.auth.user;\n}`,
      likesCount: 15,
      isCompleted: false,
    },
    {
      title: 'Server State with TanStack Angular Query',
      slug: 'tanstack-angular-query',
      category: AngularCategory.HTTP_QUERY,
      difficulty: 'advanced',
      description: 'Handle async server state, optimistic caching, automatic refetching, and pagination envelopes.',
      codeSnippet: `readonly usersQuery = injectQuery(() => ({\n  queryKey: ['users'],\n  queryFn: () => fetchUsers()\n}));`,
      likesCount: 32,
      isCompleted: false,
    },
    {
      title: 'Realtime WebSockets with Socket.IO in Angular',
      slug: 'angular-socket-io-realtime',
      category: AngularCategory.SOCKETS,
      difficulty: 'advanced',
      description: 'Connect Angular Signal state to live Socket.IO rooms and push notifications.',
      codeSnippet: `this.socket.on('notification', (data) => {\n  this.notifications.update(n => [data, ...n]);\n});`,
      likesCount: 28,
      isCompleted: false,
    },
  ];

  const angularTenant = await prisma.tenant.findUnique({
    where: { slug: 'angular-v4' },
  });

  for (const topic of topics) {
    const payload = {
      ...topic,
      ...(angularTenant && { tenantId: angularTenant.id }),
    };

    await prisma.angularTopic.upsert({
      where: { slug: topic.slug },
      update: payload,
      create: payload,
    });
    console.log(`✅ Seeded topic: ${topic.title}`);
  }
}
