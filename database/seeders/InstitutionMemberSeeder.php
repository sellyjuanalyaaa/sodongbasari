<?php

namespace Database\Seeders;

use App\Models\Institution;
use App\Models\InstitutionMember;
use Illuminate\Database\Seeder;

class InstitutionMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // BPD (Badan Permusyawaratan Desa)
        $bpd = Institution::where('abbreviation', 'BPD')->first();
        if ($bpd) {
            $bpdMembers = [
                ['name' => 'ROCHMAD NUGROHO', 'position' => 'Ketua BPD', 'order' => 1],
                ['name' => 'TRINITI RATRI ASTUTI', 'position' => 'Wakil Ketua BPD', 'order' => 2],
                ['name' => 'EDI PURWANTO', 'position' => 'Sekretaris BPD', 'order' => 3],
                ['name' => 'AMINATUZ ZAHRO', 'position' => 'Anggota BPD', 'order' => 4],
                ['name' => 'AMIRUDIN', 'position' => 'Anggota BPD', 'order' => 5],
                ['name' => 'AHMAD MUZAKI', 'position' => 'Anggota BPD', 'order' => 6],
                ['name' => 'AZIS ISKANDAR DINATA', 'position' => 'Anggota BPD', 'order' => 7],
            ];

            foreach ($bpdMembers as $member) {
                InstitutionMember::create([
                    'institution_id' => $bpd->id,
                    'name' => $member['name'],
                    'position' => $member['position'],
                    'order' => $member['order'],
                    'is_active' => true,
                ]);
            }
        }

        // KOPDES (Koperasi Desa)
        $kopdes = Institution::where('abbreviation', 'KOPDES')->first();
        if ($kopdes) {
            $kopdesMembers = [
                ['name' => 'ABDUL AZIZ NURIZUN', 'position' => 'Ketua', 'order' => 1],
                ['name' => 'AGUNG FAKIHUDIN', 'position' => 'Wakil Ketua Bidang Usaha', 'order' => 2],
                ['name' => 'MUSBIHAN JAMIL', 'position' => 'Wakil Ketua Bidang Keanggotaan', 'order' => 3],
                ['name' => 'SAYYIDA NABILA', 'position' => 'Sekretaris', 'order' => 4],
                ['name' => 'LAELATUL MUAMANAH', 'position' => 'Bendahara', 'order' => 5],
            ];

            foreach ($kopdesMembers as $member) {
                InstitutionMember::create([
                    'institution_id' => $kopdes->id,
                    'name' => $member['name'],
                    'position' => $member['position'],
                    'order' => $member['order'],
                    'is_active' => true,
                ]);
            }
        }

        // BUMDes (Badan Usaha Milik Desa)
        $bumdes = Institution::where('abbreviation', 'BUMDes')->first();
        if ($bumdes) {
            $bumdesMembers = [
                // Dewan Pengawas
                ['name' => 'SUNARYO, S.Pd', 'position' => 'Ketua Dewan Pengawas', 'order' => 1],
                ['name' => 'WILDAN FAILASUF ARIEFIAN, S.S', 'position' => 'Anggota Dewan Pengawas', 'order' => 2],
                ['name' => 'AMINUDIN', 'position' => 'Sekretaris Dewan Pengawas', 'order' => 3],
                // Pengurus BUMDes
                ['name' => 'MUTABIIN', 'position' => 'Direktur BUMDes "Bhumi Merdesa"', 'order' => 4],
                ['name' => 'HILAL TSABIT AL FARROS', 'position' => 'Sekretaris BUMDes "Bhumi Merdesa"', 'order' => 5],
                ['name' => 'SITI AMINAH, S.Pd.', 'position' => 'Bendahara BUMDes "Bhumi Merdesa"', 'order' => 6],
            ];

            foreach ($bumdesMembers as $member) {
                InstitutionMember::create([
                    'institution_id' => $bumdes->id,
                    'name' => $member['name'],
                    'position' => $member['position'],
                    'order' => $member['order'],
                    'is_active' => true,
                ]);
            }
        }
    }
}

