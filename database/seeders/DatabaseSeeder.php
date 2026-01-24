<?php

namespace Database\Seeders;

use App\Models\Budget;
use App\Models\Demographic;
use App\Models\Institution;
use App\Models\Post;
use App\Models\Potential;
use App\Models\VillageInfo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 0. Admin User
        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        // 1. Village Info
        VillageInfo::create([
            'name' => 'Desa Sodong Basari',
            'description' => 'A beautiful village in the heart of nature.',
            'vision' => 'To be a self-sufficient and prosperous village.',
            'mission' => 'Empower community, boost economy, and preserve culture.',
            'history' => 'Founded in 1900...',
            'address' => 'Jl. Raya Sodong No. 1',
            'phone' => '081234567890',
            'email' => 'info@sodongbasari.desa.id',
            'logo_path' => '/images/logo.png', // Placeholder
        ]);

        // 2. Posts (News & Announcements)
        for ($i = 0; $i < 10; $i++) {
            $title = fake()->sentence();
            Post::create([
                'title' => $title,
                'slug' => Str::slug($title) . '-' . Str::random(5),
                'content' => fake()->paragraphs(3, true),
                'category' => fake()->randomElement(['news', 'announcement']),
                'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
                'image_path' => null, // Will use fallback image in frontend
            ]);
        }

        // 3. Potentials
        for ($i = 0; $i < 6; $i++) {
            Potential::create([
                'name' => fake()->words(3, true),
                'category' => fake()->randomElement(['tourism', 'product']),
                'description' => fake()->paragraph(),
                'location' => fake()->address(),
                'contact_info' => fake()->phoneNumber(),
                'image_path' => null, // Will use fallback image in frontend
            ]);
        }

        // 4. Institutions
        $institutions = ['BPD', 'LPMD', 'PKK', 'Karang Taruna'];
        foreach ($institutions as $inst) {
            Institution::create([
                'name' => $inst,
                'abbreviation' => $inst,
                'description' => fake()->paragraph(),
                'leader_name' => fake()->name(),
            ]);
        }

        // 5. Demographics
        Demographic::create([
            'year' => 2024,
            'total_male' => 1754,
            'total_female' => 1709,
            'total_families' => 1050,
            'mutation_in' => 25,
            'mutation_out' => 15,
        ]);

        // 6. Budgets
        Budget::create(['year' => 2024, 'type' => 'income', 'amount' => 1200000000, 'realized_amount' => 1150000000]);
        Budget::create(['year' => 2024, 'type' => 'expense', 'amount' => 1100000000, 'realized_amount' => 1050000000]);
    }
}
