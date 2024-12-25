<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('اسم الطالب');
            $table->string('email')->unique()->comment('البريد الإلكتروني للطالب');
            $table->string('phone', 15)->nullable()->comment('رقم الهاتف مع رمز الدولة');
            $table->foreignId('class_id')->constrained('classes')->onDelete('cascade')->comment('معرف الصف الذي ينتمي إليه الطالب');
            $table->string('parent_whatsapp')->nullable()->comment('رقم الواتساب للولي');
            $table->string('cycle')->comment('الدورة الدراسية');
            $table->integer('grades')->comment('درجات الطالب');
            $table->enum('path', ['general', 'advanced'])->nullable()->comment('المسار الدراسي: عام أو متقدم');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
